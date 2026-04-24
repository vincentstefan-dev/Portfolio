// app/template/theme/LOGO_BANK.tsx

export type LogoVariant = {
  id: string;
  src: string;
  alt: string;
  className?: string;
  glow?: string;
  opacity?: number;
  weight?: number;
  scale?: number;
};

export const LOGO_BANK: LogoVariant[] = [
  {
    id: "default",
    src: "/logos/default.png",
    alt: "Koyote logo default",

    //size only here
    className: "w-[320px] md:w-[450px] object-contain",

    //glow stays here
    glow: "drop-shadow(0 0 40px rgba(56, 205, 255, 0.79)) drop-shadow(0 0 80px rgb(35, 88, 152))",

    //opacity control
    opacity: 0.5,

    //Weights
    weight: 0.5,
    
    //scale
    scale: 1.1,
  },
    {
    id: "8Bits", //FIX LOGO
    src: "/logos/8BIT.png",
    alt: "Koyote logo default",

    //size only here
    className: "w-[320px] md:w-[450px] object-contain",

    //glow stays here
    glow: "drop-shadow(0 0 40px rgba(56, 205, 255, 0.79)) drop-shadow(0 0 80px rgb(35, 88, 152))",

    //opacity control
    opacity: 0.5,

    //Weights
    weight: 0.5,
  },
   {
    id: "16Bits",
    src: "/logos/16bit.png",
    alt: "Koyote logo default",

    //size only here
    className: "w-[200px] md:w-[450px] object-contain",

    //glow stays here
    glow: "drop-shadow(0 0 40px rgba(56, 205, 255, 0.79)) drop-shadow(0 0 80px rgb(35, 88, 152))",

    //opacity control
    opacity: 0.5,
    //Weights
    weight: 0.5,

  },
   {
    id: "alien",
    src: "/logos/alien.png",
    alt: "Koyote logo default",

    //size only here
    className: "w-[200px] md:w-[450px] object-contain",

    //glow stays here
    glow: "drop-shadow(0 0 40px rgba(56, 205, 255, 0.79)) drop-shadow(0 0 80px rgb(35, 88, 152))",

    //opacity control
    opacity: 0.5,

    //Weights
    weight: 0.3,
  },
   {
    id: "bluecrt",
    src: "/logos/bluecrt.png",
    alt: "Koyote logo default",

    //size only here
    className: "w-[200px] md:w-[450px] object-contain",

    //glow stays here
    glow: "drop-shadow(0 0 40px rgba(56, 205, 255, 0.79)) drop-shadow(0 0 80px rgb(35, 88, 152))",

    //opacity control
    opacity: 0.5,

    //Weights
    weight: 0.2,
  },
     {
    id: "frutigerclean",
    src: "/logos/frutigerclean.png",
    alt: "Koyote logo default",

    //size only here
    className: "w-[200px] md:w-[450px] object-contain",

    //glow stays here
    glow: "drop-shadow(0 0 40px rgba(56, 205, 255, 0.79)) drop-shadow(0 0 80px rgb(35, 88, 152))",

    //opacity control
    opacity: 0.5,

    //Weights
    weight: 0.02,

  },
   {
    id: "gamecube", //fix neck
    src: "/logos/gamecube.png",
    alt: "Koyote logo default",

    //size only here
    className: "w-[200px] md:w-[450px] object-contain",

    //glow stays here
    glow: "drop-shadow(0 0 40px rgba(56, 205, 255, 0.79)) drop-shadow(0 0 80px rgb(35, 88, 152))",

    //opacity control
    opacity: 0.5,

    //Weights
    weight: 0.1,
  },
   {
    id: "IOS", //weird lining 
    src: "/logos/IOS.png",
    alt: "Koyote logo default",

    //size only here
    className: "w-[200px] md:w-[450px] object-contain",

    //glow stays here
    glow: "drop-shadow(0 0 40px rgba(56, 205, 255, 0.79)) drop-shadow(0 0 80px rgb(35, 88, 152))",

    //opacity control
    opacity: 0.5,

    //Weights
    weight: 0.3,
  },
   {
    id: "LINES",
    src: "/logos/LINES.png",
    alt: "Koyote logo default",

    //size only here
    className: "w-[200px] md:w-[450px] object-contain",

    //glow stays here
    glow: "drop-shadow(0 0 40px rgba(56, 205, 255, 0.79)) drop-shadow(0 0 80px rgb(35, 88, 152))",

    //opacity control
    opacity: 0.5,

    //Weights
    weight: 0.2,
  },
   {
    id: "liquidmetal",
    src: "/logos/liquidmetal.png",
    alt: "Koyote logo default",

    //size only here
    className: "w-[200px] md:w-[450px] object-contain",

    //glow stays here
    glow: "drop-shadow(0 0 40px rgba(56, 205, 255, 0.79)) drop-shadow(0 0 80px rgb(35, 88, 152))",

    //opacity control
    opacity: 0.5,

    //Weights
    weight: 0.5,
  },
   {
    id: "microsoft",
    src: "/logos/microsoft.png",
    alt: "Koyote logo default",

    //size only here
    className: "w-[200px] md:w-[450px] object-contain",

    //glow stays here
    glow: "drop-shadow(0 0 40px rgba(56, 205, 255, 0.79)) drop-shadow(0 0 80px rgb(35, 88, 152))",

    //opacity control
    opacity: 0.5,

    //Weights
    weight: 0.2,
  },
   {
    id: "minecraft",
    src: "/logos/minecraft.png",
    alt: "Koyote logo default",

    //size only here
    className: "w-[200px] md:w-[450px] object-contain",

    //glow stays here
    glow: "drop-shadow(0 0 40px rgba(56, 205, 255, 0.79)) drop-shadow(0 0 80px rgb(35, 88, 152))",

    //opacity control
    opacity: 0.5,

    //Weights
    weight: 0.1,
  },
   {
    id: "n64",
    src: "/logos/N64.png",
    alt: "Koyote logo default",

    //size only here
    className: "w-[200px] md:w-[450px] object-contain",

    //glow stays here
    glow: "drop-shadow(0 0 40px rgba(56, 205, 255, 0.79)) drop-shadow(0 0 80px rgb(35, 88, 152))",

    //opacity control
    opacity: 0.5,

    //Weights
    weight: 0.1,
  },
   {
    id: "PLASMA",
    src: "/logos/plasma.png",
    alt: "Koyote logo default",

    //size only here
    className: "w-[200px] md:w-[450px] object-contain",

    //glow stays here
    glow: "drop-shadow(0 0 40px rgba(56, 205, 255, 0.79)) drop-shadow(0 0 80px rgb(35, 88, 152))",

    //opacity control
    opacity: 0.5,

    //Weights
    weight: 0.2,
  },
   {
    id: "polygon",
    src: "/logos/polygon.png",
    alt: "Koyote logo default",

    //size only here
    className: "w-[200px] md:w-[450px] object-contain",

    //glow stays here
    glow: "drop-shadow(0 0 40px rgba(56, 205, 255, 0.79)) drop-shadow(0 0 80px rgb(35, 88, 152))",

    //opacity control
    opacity: 0.5,

    //Weights
    weight: 0.1,
  },
   {
    id: "purpleplasma",
    src: "/logos/purpleplasma.png",
    alt: "Koyote logo default",

    //size only here
    className: "w-[200px] md:w-[450px] object-contain",

    //glow stays here
    glow: "drop-shadow(0 0 40px rgba(56, 205, 255, 0.79)) drop-shadow(0 0 80px rgb(35, 88, 152))",

    //opacity control
    opacity: 0.5,

    //Weights
    weight: 0.2,
  },
   {
    id: "shineblue",
    src: "/logos/shineblue.png",
    alt: "Koyote logo default",

    //size only here
    className: "w-[200px] md:w-[450px] object-contain",

    //glow stays here
    glow: "drop-shadow(0 0 40px rgba(56, 205, 255, 0.79)) drop-shadow(0 0 80px rgb(35, 88, 152))",

    //opacity control
    opacity: 0.5,

    //Weights
    weight: 0.3,
  },
   {
    id: "sleekps2",
    src: "/logos/sleekps2.png",
    alt: "Koyote logo default",

    //size only here
    className: "w-[200px] md:w-[450px] object-contain",

    //glow stays here
    glow: "drop-shadow(0 0 40px rgba(56, 205, 255, 0.79)) drop-shadow(0 0 80px rgb(35, 88, 152))",

    //opacity control
    opacity: 0.5,

    //Weights
    weight: 0.2,
  },
   {
    id: "voxel",
    src: "/logos/voxel.png",
    alt: "Koyote logo default",

    //size only here
    className: "w-[200px] md:w-[450px] object-contain",

    //glow stays here
    glow: "drop-shadow(0 0 40px rgba(56, 205, 255, 0.79)) drop-shadow(0 0 80px rgb(35, 88, 152))",

    //opacity control
    opacity: 0.5,

    //Weights
    weight: 0.3,
  },
   {
    id: "web2.0",
    src: "/logos/web2.0.png",
    alt: "Koyote logo default",

    //size only here
    className: "w-[200px] md:w-[450px] object-contain",

    //glow stays here
    glow: "drop-shadow(0 0 40px rgba(56, 205, 255, 0.79)) drop-shadow(0 0 80px rgb(35, 88, 152))",

    //opacity control
    opacity: 0.5,

    //Weights
    weight: 0.2,
  },
   {
    id: "whitelines",
    src: "/logos/whitelines.png",
    alt: "Koyote logo default",

    //size only here
    className: "w-[200px] md:w-[450px] object-contain",

    //glow stays here
    glow: "drop-shadow(0 0 40px rgba(56, 205, 255, 0.79)) drop-shadow(0 0 80px rgb(35, 88, 152))",

    //opacity control
    opacity: 0.5,

    //Weights
    weight: 0.1,
  },
];

