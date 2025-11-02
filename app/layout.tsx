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
  // Enhanced Title for better search visibility
  title: "Qitmeer Raza | Full Stack Developer | MERN, Next.js, React Native, AI",
  
  // More descriptive and keyword-rich description
  description: "Qitmeer Raza is a Full Stack Software Developer with 2.5 years of experience, specializing in MERN stack, Next.js, and React Native. Expert in building scalable websites, SaaS platforms, CRM tools, and integrating AI for smarter applications. Explore my portfolio for projects in personalization, sales research, and health tech.",
  
  // Optional: Keywords for additional context (less critical for Google, but good for completeness)
  keywords: "Qitmeer Raza, Full Stack Developer, MERN stack, Next.js, React Native, Node.js, MongoDB, Express.js, React.js, TypeScript, Tailwind CSS, AI Integration, SaaS, CRM, Software Developer Portfolio, Web Development, JavaScript, Frontend, Backend",

  // Open Graph (OG) tags for social media sharing
  openGraph: {
    title: "Qitmeer Raza | Full Stack Developer",
    description: "Full Stack Software Developer with 2.5 years experience, specializing in MERN, Next.js, React Native, and AI integrations. Building fast, scalable, and intelligent web applications.",
    url: "https://iamqitmeer.vercel.app", // **IMPORTANT: Replace with your actual portfolio URL**
    siteName: "Qitmeer Raza's Portfolio",
    images: [
      {
        url: "https://iamqitmeer.vercel.app/og-image.jpg", // **IMPORTANT: Create an attractive OG image (e.g., 1200x630px) and replace this URL.**
        width: 1200,
        height: 630,
        alt: "Qitmeer Raza Full Stack Developer Portfolio",
      },
    ],
    locale: "en_US",
  },

  // Twitter Card tags for Twitter sharing
  twitter: {
    card: "summary_large_image",
    title: "Qitmeer Raza | Full Stack Developer",
    description: "Full Stack Software Developer with 2.5 years experience, specializing in MERN, Next.js, React Native, and AI integrations. Building fast, scalable, and intelligent web applications.",
    creator: "@yourtwitterhandle", // **IMPORTANT: Replace with your Twitter handle, e.g., @iamqitmeer**
    images: ["https://iamqitmeer.vercel.app/twitter-image.jpg"], // **IMPORTANT: Create an attractive Twitter image (e.g., 1200x675px) and replace this URL.**
  },

  // Canonical URL (optional but good for preventing duplicate content issues if you have multiple URLs for the same content)
  alternates: {
    canonical: "https://iamqitmeer.vercel.app", // **IMPORTANT: Replace with your actual portfolio URL**
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