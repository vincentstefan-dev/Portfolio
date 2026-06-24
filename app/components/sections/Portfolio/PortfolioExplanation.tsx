"use client";

import { portfolioRc as rc } from "./portfolioResponsiveConfig";

export default function JunixIdentitySection() {
  return (
    <section className={rc.identity.section}>
      <div className={rc.identity.rail}>
        <div className={rc.identity.railDotTop} />
        <div className={rc.identity.railDotBottom} />

        <div className={rc.identity.railDots}>
          <span className={rc.identity.railDotOne} />
          <span className={rc.identity.railDotTwo} />
          <span className={rc.identity.railDotThree} />
          <span className={rc.identity.railDotFour} />
        </div>
      </div>

      <div className={rc.identity.inner}>
        <div className={rc.identity.grid}>
          <div>
            <p className={rc.identity.kicker}>Project 001</p>

            <h1 className={rc.identity.title}>
              <span className={rc.identity.titleLineOne}>
                <span className={rc.identity.titleGradientOne}>
                  The making of{" "}
                </span>

                <span className={rc.identity.rainbowWord}>Koyote</span>

                <span className={rc.identity.titleGradientOne}>,</span>
              </span>

              <span className={rc.identity.titleLineTwo}>From Concept to</span>

              <span className={rc.identity.titleLineThree}>Identity.</span>
            </h1>
          </div>

          <div className={rc.identity.listWrap}>
            <div className={rc.identity.listGlow} />

            <ul className={rc.identity.list}>
              <li className={rc.identity.listItem}>
                <span className={rc.identity.listDot} />
                Logo
              </li>

              <li className={rc.identity.listItem}>
                <span className={rc.identity.listDot} />
                Brand Identity
              </li>

              <li className={rc.identity.listItem}>
                <span className={rc.identity.listDot} />
                Social Media Posts
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}