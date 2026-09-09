export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src="/logo-branca-dourada.webp"
      alt="Núcleo ProAudio"
      className={`h-8 w-auto object-contain sm:h-9 ${className}`}
    />
  );
}
