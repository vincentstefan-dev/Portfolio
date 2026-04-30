"use client";

type SiteSignatureProps = {
  fontClass: string;
};

export default function SiteSignature({ fontClass }: SiteSignatureProps) {
  return (
    <div className="pointer-events-none absolute bottom-2 left-1/2 z-20 -translate-x-1/2 md:bottom-4">
      <div className="flex items-center gap-2">
        <img
          src="/Gifs/mystar.gif"
          alt="Vincent Lambour logo"
          className="h-5 w-5 object-contain opacity-90"
        />

        <span
          className={`${fontClass} select-none whitespace-nowrap text-[9px] leading-none tracking-[0.12em] text-white/30`}
        >
          Designed by Vincent Lambour
        </span>
      </div>
    </div>
  );
}