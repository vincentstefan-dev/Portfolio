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

//RESPONSIVE SIZE SYSTEM (FIXED)
const LOGO_SIZE = `
  w-[42vw] 
  max-w-[160px] 

  sm:max-w-[190px] 

  md:w-[450px] 
  md:max-w-none 

  lg:w-[520px] 

  object-contain
`;



export const LOGO_BANK: LogoVariant[] = [
  {
    id: "default",
    src: "/logos/default.webp",
    alt: "Koyote logo default",
    className: LOGO_SIZE,
    opacity: 0.5,
    weight: 0.5,
  },
  {
    id: "8Bits",
    src: "/logos/8BIT.webp",
    alt: "Koyote logo 8-bit",
    className: LOGO_SIZE,
    opacity: 0.5,
    weight: 0.5,
  },
  {
    id: "16Bits",
    src: "/logos/16bit.webp",
    alt: "Koyote logo 16-bit",
    className: LOGO_SIZE,
    opacity: 0.5,
    weight: 0.5,
  },
  {
    id: "alien",
    src: "/logos/alien.webp",
    alt: "Koyote logo alien",
    className: LOGO_SIZE,
    opacity: 0.5,
    weight: 0.3,
  },
  {
    id: "bluecrt",
    src: "/logos/bluecrt.webp",
    alt: "Koyote logo blue CRT",
    className: LOGO_SIZE,
    opacity: 0.5,
    weight: 0.2,
  },
  {
    id: "frutigerclean",
    src: "/logos/frutigerclean.webp",
    alt: "Koyote logo Frutiger clean",
    className: LOGO_SIZE,
    opacity: 0.5,
    weight: 0.02,
  },
  {
    id: "gamecube",
    src: "/logos/gamecube.webp",
    alt: "Koyote logo GameCube",
    className: LOGO_SIZE,
    opacity: 0.5,
    weight: 0.1,
  },
  {
    id: "IOS",
    src: "/logos/IOS.webp",
    alt: "Koyote logo iOS",
    className: LOGO_SIZE,
    opacity: 0.5,
    weight: 0.3,
  },
  {
    id: "LINES",
    src: "/logos/LINES.webp",
    alt: "Koyote logo lines",
    className: LOGO_SIZE,
    opacity: 0.5,
    weight: 0.2,
  },
  {
    id: "liquidmetal",
    src: "/logos/liquidmetal.webp",
    alt: "Koyote logo liquid metal",
    className: LOGO_SIZE,
    opacity: 0.5,
    weight: 0.5,
  },
  {
    id: "microsoft",
    src: "/logos/microsoft.webp",
    alt: "Koyote logo Microsoft style",
    className: LOGO_SIZE,
    opacity: 0.5,
    weight: 0.2,
  },
  {
    id: "minecraft",
    src: "/logos/minecraft.webp",
    alt: "Koyote logo Minecraft",
    className: LOGO_SIZE,
    opacity: 0.5,
    weight: 0.1,
  },
  {
    id: "n64",
    src: "/logos/N64.webp",
    alt: "Koyote logo N64",
    className: LOGO_SIZE,
    opacity: 0.5,
    weight: 0.1,
  },
  {
    id: "PLASMA",
    src: "/logos/plasma.webp",
    alt: "Koyote logo plasma",
    className: LOGO_SIZE,
    opacity: 0.5,
    weight: 0.2,
  },
  {
    id: "polygon",
    src: "/logos/polygon.webp",
    alt: "Koyote logo polygon",
    className: LOGO_SIZE,
    opacity: 0.5,
    weight: 0.1,
  },
  {
    id: "purpleplasma",
    src: "/logos/purpleplasma.webp",
    alt: "Koyote logo purple plasma",
    className: LOGO_SIZE,
    opacity: 0.5,
    weight: 0.2,
  },
  {
    id: "shineblue",
    src: "/logos/shineblue.webp",
    alt: "Koyote logo shine blue",
    className: LOGO_SIZE,
    opacity: 0.5,
    weight: 0.3,
  },
  {
    id: "sleekps2",
    src: "/logos/sleekps2.webp",
    alt: "Koyote logo sleek PS2",
    className: LOGO_SIZE,
    opacity: 0.5,
    weight: 0.2,
  },
  {
    id: "voxel",
    src: "/logos/voxel.webp",
    alt: "Koyote logo voxel",
    className: LOGO_SIZE,
    opacity: 0.5,
    weight: 0.3,
  },
  {
    id: "web2.0",
    src: "/logos/web2.0.webp",
    alt: "Koyote logo web 2.0",
    className: LOGO_SIZE,
    opacity: 0.5,
    weight: 0.2,
  },
  {
    id: "whitelines",
    src: "/logos/whitelines.webp",
    alt: "Koyote logo white lines",
    className: LOGO_SIZE,
    opacity: 0.5,
    weight: 0.1,
  },
];