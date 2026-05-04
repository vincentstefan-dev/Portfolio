"use client";

import Link from "next/link";
import { Briefcase, Mail } from "lucide-react";

type IconProps = {
  className?: string;
};

type OnlineLink = {
  label: string;
  href: string;
  icon: React.ComponentType<IconProps>;
  external?: boolean;
};

function GithubIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.97 3.22 9.18 7.69 10.68.56.1.76-.24.76-.54v-2.02c-3.13.68-3.79-1.35-3.79-1.35-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1 2.63.71 3.28 1.45.1-.73.39-1.23.71-1.51-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .94-.3 3.1 1.15a10.7 10.7 0 0 1 5.64 0c2.15-1.45 3.09-1.15 3.09-1.15.62 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.64 5.27-5.15 5.55.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54a11.26 11.26 0 0 0 7.68-10.68C23.25 5.48 18.27.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.31 8.25h4.38V23H.31V8.25ZM8.13 8.25h4.2v2.02h.06c.58-1.1 2.02-2.27 4.16-2.27C21 8 24 10.93 24 17.23V23h-4.38v-5.11c0-3.22-1.15-5.42-4.04-5.42-2.2 0-3.51 1.48-4.09 2.91-.21.51-.26 1.22-.26 1.93V23H6.86s.06-12.4 0-14.75h1.27Z" />
    </svg>
  );
}

const onlineLinks: OnlineLink[] = [
  {
    label: "Portfolio",
    href: "/portfolio",
    icon: Briefcase,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/vincent-lambour-59aab53aa",
    icon: LinkedinIcon,
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/vincentstefan-dev",
    icon: GithubIcon,
    external: true,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: Mail,
  },
];

export default function OnlineFlowerFab() {
  return (
    <div className="mt-1 flex items-center justify-center gap-3">
      {onlineLinks.map((item) => {
        const Icon = item.icon;
        const isExternal = item.external || item.href.startsWith("http");
        const isMail = item.href.startsWith("mailto:");

        const className =
          "group relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/60 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-blue-300/40 hover:bg-blue-300/10 hover:text-white hover:shadow-[0_0_18px_rgba(96,165,250,0.25)]";

        const content = (
          <>
            <Icon className="h-5 w-5" />

            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-blue-950/90 px-2 py-1 text-[10px] font-medium text-white/60 opacity-0 shadow-[0_0_14px_rgba(96,165,250,0.18)] backdrop-blur-md transition group-hover:opacity-100">
              {item.label}
            </span>
          </>
        );

        if (isExternal || isMail) {
          return (
            <a
              key={item.label}
              href={item.href}
              target={isExternal && !isMail ? "_blank" : undefined}
              rel={isExternal && !isMail ? "noopener noreferrer" : undefined}
              aria-label={item.label}
              className={className}
            >
              {content}
            </a>
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            aria-label={item.label}
            className={className}
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
}