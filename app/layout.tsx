import Header from "@/components/header";
import "./globals.css";
import { Poppins } from "next/font/google"; // 1. Inter ki jagah Poppins import karein
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";

// 2. Poppins font ko zaroori weights ke saath configure karein
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Aap apni zaroorat ke mutabiq weights chun sakte hain
});

export const metadata = {
  title:
    "Muhammad Qitmeer | Software Engineer | TypeScript, MERN, Next.js, AI",
  description:
    "Muhammad Qitmeer is a Software Engineer from Karachi, Pakistan — AngleBracket.io & Zynix Solutions. Full stack developer building web apps, mobile apps, CRM, and SaaS with TypeScript, Python, MERN, Next.js, Nest.js, React Native, PostgreSQL, Supabase, and AI.",
  keywords:
    "Muhammad Qitmeer, Qitmeer Raza, Software Engineer, Full Stack Developer, AngleBracket, Zynix Solutions, MERN, Next.js, Nest.js, React Native, TypeScript, Python, PostgreSQL, Supabase, AI, Machine Learning, SaaS, CRM, Karachi Pakistan",

  openGraph: {
    title: "Muhammad Qitmeer | Software Engineer",
    description:
      "Software Engineer at AngleBracket.io. TypeScript, MERN, Next.js, Nest.js, React Native, PostgreSQL, Supabase, and AI — building fast, scalable web and mobile products.",
    url: "https://iamqitmeer.vercel.app",
    siteName: "Muhammad Qitmeer Portfolio",
    images: [
      {
        url: "https://iamqitmeer.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Qitmeer Software Engineer Portfolio",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Muhammad Qitmeer | Software Engineer",
    description:
      "Software Engineer building web apps, SaaS, CRM, and AI products with TypeScript, MERN, Next.js, and React Native.",
    images: ["https://iamqitmeer.vercel.app/twitter-image.jpg"],
  },

  alternates: {
    canonical: "https://iamqitmeer.vercel.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body
        // 3. Yahan 'poppins.className' ka istemal karein
        className={`${poppins.className} bg-gray-50 text-gray-950 relative pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
        <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>

        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <Header />
            {children}
            <Footer />

            <Toaster position="top-right" />
            <ThemeSwitch />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}