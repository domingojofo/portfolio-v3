import type { Metadata } from "next";
import localFont from "next/font/local";
import { BottomBlur } from "@/components/EdgeBlur";
import { MobileBar } from "@/components/MobileBar";
import { Nav } from "@/components/Nav";
import { INTRO_KEY } from "@/lib/intro";
import "./globals.css";

const maragsa = localFont({
  src: "./fonts/MaragsaDisplay.otf",
  variable: "--font-maragsa",
  display: "block",
});

// Trial licences — swap for the licensed web font before launch
const graphik = localFont({
  src: "./fonts/Graphik-Regular-Trial.otf",
  variable: "--font-graphik",
  weight: "400",
});

const graphikWide = localFont({
  src: "./fonts/GraphikWide-Regular-Trial.otf",
  variable: "--font-graphik-wide",
  weight: "400",
});

export const metadata: Metadata = {
  title: { default: "Jofo — Relentlessly Collaborative", template: "%s — Jofo" },
  description: "Hands-on product design leader specializing in FinTech and AI-driven interfaces.",
};

// Runs before first paint. Mirrors shouldPlayIntro() in Hero.tsx: on "/", once per session,
// motion allowed → mark the intro as playing so the page starts in its pre-intro state.
const introScript = `try{if(location.pathname==="/"&&!sessionStorage.getItem(${JSON.stringify(INTRO_KEY)})&&!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="playing"}catch(e){}`;

// Runs once the page markup is parsed: a direct visit to /design opens at the Design section.
const designScrollScript = `if(location.pathname==="/design"){var d=document.getElementById("design");d&&d.scrollIntoView({behavior:"instant"})}`;

export default function RootLayout({ children, modal }: LayoutProps<"/">) {
  return (
    // The intro script sets data-intro on <html> before React hydrates
    <html lang="en" className={`${maragsa.variable} ${graphik.variable} ${graphikWide.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <div className="paper" />
        {children}
        {modal}
        <Nav />
        <BottomBlur />
        <MobileBar />
        <script dangerouslySetInnerHTML={{ __html: designScrollScript }} />
      </body>
    </html>
  );
}
