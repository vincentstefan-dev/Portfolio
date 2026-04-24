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

const LOGO_GLOW =
  "drop-shadow(0 0 40px rgba(56,205,255,0.79)) drop-shadow(0 0 80px rgba(35,88,152,0.9))";

export const LOGO_BANK: LogoVariant[] = [
  {
    id: "default",
    src: "/logos/default.png",
    alt: "Koyote logo default",
    className: LOGO_SIZE,
    glow: LOGO_GLOW,
    opacity: 0.5,
    weight: 0.5,
  },
  {
    id: "8Bits",
    src: "/logos/8BIT.png",
    alt: "Koyote logo 8-bit",
    className: LOGO_SIZE,
    glow: LOGO_GLOW,
    opacity: 0.5,
    weight: 0.5,
  },
  {
    id: "16Bits",
    src: "/logos/16bit.png",
    alt: "Koyote logo 16-bit",
    className: LOGO_SIZE,
    glow: LOGO_GLOW,
    opacity: 0.5,
    weight: 0.5,
  },
  {
    id: "alien",
    src: "/logos/alien.png",
    alt: "Koyote logo alien",
    className: LOGO_SIZE,
    glow: LOGO_GLOW,
    opacity: 0.5,
    weight: 0.3,
  },
  {
    id: "bluecrt",
    src: "/logos/bluecrt.png",
    alt: "Koyote logo blue CRT",
    className: LOGO_SIZE,
    glow: LOGO_GLOW,
    opacity: 0.5,
    weight: 0.2,
  },
  {
    id: "frutigerclean",
    src: "/logos/frutigerclean.png",
    alt: "Koyote logo Frutiger clean",
    className: LOGO_SIZE,
    glow: LOGO_GLOW,
    opacity: 0.5,
    weight: 0.02,
  },
  {
    id: "gamecube",
    src: "/logos/gamecube.png",
    alt: "Koyote logo GameCube",
    className: LOGO_SIZE,
    glow: LOGO_GLOW,
    opacity: 0.5,
    weight: 0.1,
  },
  {
    id: "IOS",
    src: "/logos/IOS.png",
    alt: "Koyote logo iOS",
    className: LOGO_SIZE,
    glow: LOGO_GLOW,
    opacity: 0.5,
    weight: 0.3,
  },
  {
    id: "LINES",
    src: "/logos/LINES.png",
    alt: "Koyote logo lines",
    className: LOGO_SIZE,
    glow: LOGO_GLOW,
    opacity: 0.5,
    weight: 0.2,
  },
  {
    id: "liquidmetal",
    src: "/logos/liquidmetal.png",
    alt: "Koyote logo liquid metal",
    className: LOGO_SIZE,
    glow: LOGO_GLOW,
    opacity: 0.5,
    weight: 0.5,
  },
  {
    id: "microsoft",
    src: "/logos/microsoft.png",
    alt: "Koyote logo Microsoft style",
    className: LOGO_SIZE,
    glow: LOGO_GLOW,
    opacity: 0.5,
    weight: 0.2,
  },
  {
    id: "minecraft",
    src: "/logos/minecraft.png",
    alt: "Koyote logo Minecraft",
    className: LOGO_SIZE,
    glow: LOGO_GLOW,
    opacity: 0.5,
    weight: 0.1,
  },
  {
    id: "n64",
    src: "/logos/N64.png",
    alt: "Koyote logo N64",
    className: LOGO_SIZE,
    glow: LOGO_GLOW,
    opacity: 0.5,
    weight: 0.1,
  },
  {
    id: "PLASMA",
    src: "/logos/plasma.png",
    alt: "Koyote logo plasma",
    className: LOGO_SIZE,
    glow: LOGO_GLOW,
    opacity: 0.5,
    weight: 0.2,
  },
  {
    id: "polygon",
    src: "/logos/polygon.png",
    alt: "Koyote logo polygon",
    className: LOGO_SIZE,
    glow: LOGO_GLOW,
    opacity: 0.5,
    weight: 0.1,
  },
  {
    id: "purpleplasma",
    src: "/logos/purpleplasma.png",
    alt: "Koyote logo purple plasma",
    className: LOGO_SIZE,
    glow: LOGO_GLOW,
    opacity: 0.5,
    weight: 0.2,
  },
  {
    id: "shineblue",
    src: "/logos/shineblue.png",
    alt: "Koyote logo shine blue",
    className: LOGO_SIZE,
    glow: LOGO_GLOW,
    opacity: 0.5,
    weight: 0.3,
  },
  {
    id: "sleekps2",
    src: "/logos/sleekps2.png",
    alt: "Koyote logo sleek PS2",
    className: LOGO_SIZE,
    glow: LOGO_GLOW,
    opacity: 0.5,
    weight: 0.2,
  },
  {
    id: "voxel",
    src: "/logos/voxel.png",
    alt: "Koyote logo voxel",
    className: LOGO_SIZE,
    glow: LOGO_GLOW,
    opacity: 0.5,
    weight: 0.3,
  },
  {
    id: "web2.0",
    src: "/logos/web2.0.png",
    alt: "Koyote logo web 2.0",
    className: LOGO_SIZE,
    glow: LOGO_GLOW,
    opacity: 0.5,
    weight: 0.2,
  },
  {
    id: "whitelines",
    src: "/logos/whitelines.png",
    alt: "Koyote logo white lines",
    className: LOGO_SIZE,
    glow: LOGO_GLOW,
    opacity: 0.5,
    weight: 0.1,
  },
];