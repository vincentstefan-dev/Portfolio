"use client";

/* layout for 404*/
import { useEffect, useState } from "react";
import Link from "next/link";
import { House } from "lucide-react";

import NeonStarIntro from "../components/NeonStarIntro";
import { NOT_FOUND_BANK } from "@/app/components/template/theme/notfoundwordbank";
import { personalProjectsRc as rc } from "./personalProjectsResponsiveConfig";

export default function Page() {
  const [phrase, setPhrase] = useState("");

  useEffect(() => {
    setPhrase(NOT_FOUND_BANK[0]);

    const interval = window.setInterval(() => {
      setPhrase(
        NOT_FOUND_BANK[Math.floor(Math.random() * NOT_FOUND_BANK.length)]
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className={rc.main}>
      <NeonStarIntro />

      {/* BACK BUTTON */}
      <div className={rc.backButtonWrap}>
        <Link href="/" aria-label="Return to portfolio" className={rc.backButton}>
          <House className={rc.backIcon} strokeWidth={1.5} />
        </Link>
      </div>

      {/* CENTER 404 VISUAL */}
      <div className={rc.imageWrap}>
        <img src="/Icons/404.png" alt="404" className={rc.image} />
      </div>

      {/* TEXT BELOW IMAGE */}
      <div className={rc.textWrap}>
        <div className={rc.textBlock}>
          <p className={rc.phrase}>{phrase || "This page drifted away"}</p>
        </div>
      </div>
    </main>
  );
}