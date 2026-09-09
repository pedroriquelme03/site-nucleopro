import { useEffect, useRef, type RefObject } from "react";

const VIDEO_SRC = "/products/caixa_girando_frente_scroll.mp4?v=h264";

export function ScrollSpeakerVideo({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetTime = useRef(0);
  const seeking = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!video || !canvas || !section) return;

    video.muted = true;
    video.playsInline = true;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const fitCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    const chromaKeyBlue = () => {
      const { width: w, height: h } = canvas;
      const frame = ctx.getImageData(0, 0, w, h);
      const d = frame.data;
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i];
        const g = d[i + 1];
        const b = d[i + 2];
        const dominance = b - Math.max(r, g);
        if (dominance > 48 && b > 90) {
          const t = Math.min(1, (dominance - 48) / 36);
          d[i + 3] = Math.round(d[i + 3] * (1 - t));
        } else if (dominance > 18 && b > 70) {
          const spill = (dominance - 18) / 40;
          d[i + 2] = Math.round(b - (b - Math.max(r, g)) * spill * 0.7);
        }
      }
      ctx.putImageData(frame, 0, 0);
    };

    const draw = () => {
      if (video.readyState < 2) return;
      fitCanvas();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      chromaKeyBlue();
    };

    const durationOf = () => {
      const d = video.duration;
      return d && Number.isFinite(d) && d > 0 ? d : 0;
    };

    const progressFromSection = () => {
      const max = section.offsetHeight - window.innerHeight;
      if (max <= 0) return 0;
      const top = section.getBoundingClientRect().top;
      return Math.min(1, Math.max(0, -top / max));
    };

    const setFromScroll = () => {
      const duration = durationOf();
      if (!duration) return;
      const progress = reduced ? 0 : progressFromSection();
      targetTime.current = progress * (duration - 0.05);
      if (!seeking.current && video.readyState >= 2) {
        if (Math.abs(video.currentTime - targetTime.current) >= 1 / 45) {
          seeking.current = true;
          video.currentTime = targetTime.current;
        }
      }
    };

    const onSeeked = () => {
      seeking.current = false;
      draw();
      const duration = durationOf();
      if (!duration) return;
      if (Math.abs(video.currentTime - targetTime.current) >= 1 / 45) {
        seeking.current = true;
        video.currentTime = targetTime.current;
      }
    };

    const onReady = () => {
      setFromScroll();
      draw();
    };

    video.addEventListener("seeked", onSeeked);
    video.addEventListener("loadeddata", onReady);
    window.addEventListener("scroll", setFromScroll, { passive: true });
    window.addEventListener("resize", setFromScroll);
    const ro = new ResizeObserver(() => {
      fitCanvas();
      draw();
    });
    ro.observe(canvas);
    video.load();
    setFromScroll();

    return () => {
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadeddata", onReady);
      window.removeEventListener("scroll", setFromScroll);
      window.removeEventListener("resize", setFromScroll);
      ro.disconnect();
    };
  }, [sectionRef]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[320px] lg:mx-0 lg:max-w-[420px] xl:max-w-[460px]">
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        tabIndex={-1}
        aria-hidden="true"
        className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
      />
      <canvas
        ref={canvasRef}
        aria-label="Mackie Thump girando de lado para frente"
        className="h-full w-full"
      />
    </div>
  );
}
