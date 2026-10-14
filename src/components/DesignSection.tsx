import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";
import { Ticker } from "./Ticker";
import { BanksHeroCard } from "./demos/banks/BanksHeroCard";
import { TrustedDestinationsCard } from "./demos/trusted-destinations/TrustedDestinationsCard";
import { VirtualAccountsCard } from "./demos/va-charts/VirtualAccountsCard";

export function DesignSection() {
  return (
    // Rises over the pinned hero as you scroll; the carousel is its top edge, peeking up
    // from the bottom of the first screen
    <section className="design" id="design" aria-labelledby="design-title">
      <Ticker />
      <div className="design-inner">
        <h2 id="design-title">Impactful products crafted with care and collaboration</h2>
        <ul className="project-list">
          {projects.map((p, i) => (
            <li key={p.slug}>
              {/* scroll={false}: opening the project modal shouldn't move the page underneath */}
              <Link className="project-card" href={`/design/${p.slug}`} scroll={false}>
                <Image src={p.cover.src} width={p.cover.width} height={p.cover.height} alt={p.cover.alt} sizes="(max-width: 1088px) 100vw, 1040px"
                  loading={i === 0 ? "eager" : "lazy"} /* first image is on screen when /design opens */ />
              </Link>
            </li>
          ))}
          {/* Anchorage pieces shown in place rather than linking to a case study: the playable iOS
              prototype beside the website's banks hero animation, both at the same height */}
          <li className="project-row">
            <div>
              <TrustedDestinationsCard />
            </div>
            <div>
              <BanksHeroCard />
            </div>
          </li>
          <li>
            <VirtualAccountsCard />
          </li>
        </ul>
      </div>
    </section>
  );
}
