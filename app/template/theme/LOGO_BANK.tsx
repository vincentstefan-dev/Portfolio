// app/template/theme/LOGO_BANK.tsx

export type LogoVariant = {
  id: string;
  src: string;
  alt: string;
  className?: string;
  glow?: string;
  opacity?: number; // ✅ add this
};

export const LOGO_BANK: LogoVariant[] = [
  {
    id: "default",
    src: "/logos/default.png",
    alt: "Koyote logo default",

    //size only here
    className: "w-[320px] md:w-[520px] object-contain",

    //glow stays here
    glow: "drop-shadow(0 0 40px rgba(56, 205, 255, 0.79)) drop-shadow(0 0 80px rgb(35, 88, 152))",

    //opacity control
    opacity: 0.5,
  }
];