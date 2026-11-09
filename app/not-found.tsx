import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="relative grid min-h-[100svh] place-items-center overflow-hidden px-5 pt-24">
      <div aria-hidden className="dot-grid absolute inset-0" />
      <div className="relative max-w-[40rem] text-center">
        <p className="font-brand text-[clamp(6rem,22vw,13rem)] font-bold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_rgb(var(--lilac)/0.8)]">
          404
        </p>
        <h1 className="mt-6 font-brand text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
          This page is still <span className="text-lilac">an early idea.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-[30rem] text-[1.0625rem] leading-[1.6] text-dim">
          It hasn&apos;t been built yet, or the link has moved. Everything that has been built is
          one click away.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Back to home
          </Link>
          <Link href="/journey" className="btn-ghost">
            Read the journey
          </Link>
        </div>
      </div>
    </main>
  );
}
