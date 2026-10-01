import AutoScroll from "embla-carousel-auto-scroll";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export interface Logo {
  id: string;
  description: string;
  image?: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  description?: string;
  logos?: Logo[];
  className?: string;
  id?: string;
}

const defaultLogos: Logo[] = [
  { id: "logo-1", description: "Palco Norte" },
  { id: "logo-2", description: "Circuito Live" },
  { id: "logo-3", description: "Comunidade Vida" },
  { id: "logo-4", description: "Atlas Studio" },
  { id: "logo-5", description: "House Audio" },
  { id: "logo-6", description: "Arena 12" },
  { id: "logo-7", description: "Luz & Som" },
  { id: "logo-8", description: "Catedral" },
];

const Logos3 = ({
  heading = "Lojas parceiras",
  description,
  logos = defaultLogos,
  className,
  id,
}: Logos3Props) => {
  const track = [...logos, ...logos];

  return (
    <section id={id} className={cn("overflow-x-hidden py-20 sm:py-28", className)}>
      <div className="container-x flex flex-col items-center text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-pretty text-white sm:text-4xl">
          {heading}
        </h2>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">{description}</p>
        ) : null}
      </div>
      <div className="w-full max-w-[100vw] overflow-hidden pt-10 md:pt-14">
        <div className="relative mx-auto w-full max-w-full overflow-hidden lg:max-w-5xl">
          <Carousel
            className="w-full min-w-0 overflow-hidden"
            opts={{ loop: true }}
            plugins={[
              AutoScroll({
                playOnInit: true,
                speed: 0.8,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
          >
            <CarouselContent className="ml-0">
              {track.map((logo, index) => (
                <CarouselItem
                  key={`${logo.id}-${index}`}
                  className="flex basis-1/2 justify-center pl-0 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <div className="mx-3 flex w-full sm:mx-4">
                    {logo.image ? (
                      <div
                        className={cn(
                          "flex h-24 w-full items-center justify-center rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-md",
                          logo.className,
                        )}
                        title={logo.description}
                      >
                        <img
                          src={logo.image}
                          alt={logo.description}
                          loading="lazy"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="flex h-24 w-full items-center justify-center rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                        <span
                          className={cn(
                            "whitespace-nowrap text-center font-display text-base font-bold tracking-[0.08em] text-ink-900 uppercase",
                            logo.className,
                          )}
                        >
                          {logo.description}
                        </span>
                      </div>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  );
};

export { Logos3 };
