import { type FC } from "react";

export interface iCardItem {
  title: string;
  description: string;
  tag: string;
  src: string;
  link: string;
  color: string;
  textColor: string;
}

interface iCardProps extends Omit<iCardItem, "src" | "link" | "tag"> {
  i: number;
  src: string;
  offsetTop: number;
}

const Card: FC<iCardProps> = ({ title, description, color, textColor, src, offsetTop }) => {
  return (
    <div
      className="sticky flex items-start justify-center px-4 pt-4"
      style={{
        top: offsetTop,
        height: `calc(100svh - ${offsetTop}px)`,
      }}
    >
      <div
        className="relative mx-auto flex h-[300px] w-full max-w-[700px] flex-col items-center justify-center overflow-hidden px-10 py-12 shadow-card md:h-[400px] md:w-[600px] md:px-12"
        style={{ backgroundColor: color }}
      >
        <div className="absolute inset-0 z-0">
          <img className="h-full w-full object-cover" src={src} alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/25" />
        </div>
        <span className="relative z-10 mt-5 text-center font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
          <span className="relative z-10" style={{ color: textColor }}>
            {title}
          </span>
        </span>
        <div
          className="relative z-10 mt-2 mb-0 text-center font-sans text-lg font-medium tracking-wide md:text-2xl"
          style={{ lineHeight: 1.4, color: textColor }}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

interface iCardSlideProps {
  items: iCardItem[];
  offsetTop?: number;
}

const CardsParallax: FC<iCardSlideProps> = ({ items, offsetTop = 0 }) => {
  return (
    <>
      {items.map((project, i) => {
        return <Card key={`p_${i}`} {...project} i={i} offsetTop={offsetTop} />;
      })}
    </>
  );
};

export { CardsParallax };
