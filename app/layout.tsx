import "@fontsource-variable/bricolage-grotesque/standard.css";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import SiteHeader from "@/components/site-header";
import Footer from "@/components/footer";

const siteUrl = "https://iamqitmeer.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Qitmeer Raza, software engineer and founder", template: "%s" },
  description:
    "Qitmeer Raza is a software engineer and founder in Karachi. Founder of Augere Labs, building Rembly and Hearlist, and Forward Deployed Engineer at AngleBrackets.",
  keywords: [
    "Qitmeer Raza",
    "Augere Labs",
    "Rembly",
    "Hearlist",
    "AngleBrackets",
    "Forward Deployed Engineer",
    "Software Engineer Karachi",
    "Next.js",
    "React Native",
    "TypeScript",
    "AI applications",
  ],
  themeColor: "#0c0b12",
  openGraph: {
    title: "Qitmeer Raza",
    description:
      "Software engineer and founder. I take products from an early idea to something people can actually use.",
    url: siteUrl,
    siteName: "Qitmeer Raza",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Qitmeer Raza: I take products from an early idea to something people can actually use." }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
    title: "Qitmeer Raza",
    description:
      "Software engineer and founder. Augere Labs, Rembly, Hearlist, AngleBrackets.",
  },
  alternates: { canonical: siteUrl },
};

// Runs before paint: flags whether motion is allowed so animated elements
// start in their hidden state without a flash.
const bootScript = `(function(){try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion-ok');}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-lilac focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <Footer />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#15131d",
              color: "#f2effa",
              border: "1px solid rgb(236 232 255 / 0.1)",
              borderRadius: "999px",
              fontSize: "0.9375rem",
            },
            success: { iconTheme: { primary: "#dad1f9", secondary: "#0c0b12" } },
            error: { iconTheme: { primary: "#ffb547", secondary: "#0c0b12" } },
          }}
        />
      </body>
    </html>
  );
}
