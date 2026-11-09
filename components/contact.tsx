"use client";

import { useRef } from "react";
import toast from "react-hot-toast";
import { FiArrowUpRight } from "react-icons/fi";
import { sendEmail } from "@/actions/sendEmail";
import { profile } from "@/lib/data";
import SubmitBtn from "./submit-btn";

const field =
  "w-full rounded-xl border border-line bg-ink/60 px-4 text-paper transition-colors duration-200 hover:border-paper/20 focus:border-lilac focus:outline-none";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-24 overflow-hidden border-t border-line">
      {/* soft light from the bottom, in brand colours */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-64 left-1/2 h-[34rem] w-[64rem] -translate-x-1/2 rounded-[100%] bg-lilac-deep/20 blur-[120px]"
      />
      <div className="relative mx-auto grid max-w-[80rem] gap-14 px-5 py-24 md:grid-cols-12 md:gap-12 md:px-10 md:py-36">
        <div className="md:col-span-6">
          <h2 id="contact-title" className="display text-[clamp(2.8rem,6.4vw,5.4rem)] [text-wrap:balance]">
            Have a product <span className="text-lilac">worth building?</span>
          </h2>
          <p className="mt-7 max-w-[30rem] text-[1.125rem] leading-[1.6] text-dim">
            Whether you&apos;re starting with an idea, building a company or working through
            a hard technical problem, I&apos;m happy to connect. Founders, investors and
            engineers welcome.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="group mt-10 inline-flex items-center gap-2 break-all font-brand text-[clamp(1.4rem,2.6vw,2rem)] font-bold tracking-[-0.03em] transition-colors hover:text-lilac"
          >
            {profile.email}
            <FiArrowUpRight
              aria-hidden
              className="shrink-0 text-signal transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link">
              LinkedIn <FiArrowUpRight aria-hidden />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="link">
              GitHub <FiArrowUpRight aria-hidden />
            </a>
            <a href={profile.augere} target="_blank" rel="noreferrer" className="link">
              Augere Labs <FiArrowUpRight aria-hidden />
            </a>
          </div>
        </div>

        <form
          ref={formRef}
          className="panel flex flex-col gap-5 bg-raised/80 p-6 backdrop-blur md:col-span-6 md:p-9"
          action={async (formData) => {
            const { error } = await sendEmail(formData);
            if (error) {
              toast.error(`Message not sent: ${error}. Try again or email me directly.`);
              return;
            }
            formRef.current?.reset();
            toast.success("Message sent. I'll reply by email.");
          }}
        >
          <p className="font-brand text-[1.5rem] font-bold tracking-[-0.02em]">Send a message</p>
          <label className="flex flex-col gap-2">
            <span className="text-[0.875rem] font-medium text-dim">Your email</span>
            <input
              className={`${field} h-12`}
              name="senderEmail"
              type="email"
              autoComplete="email"
              required
              maxLength={500}
              placeholder="you@company.com"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[0.875rem] font-medium text-dim">What are you working on?</span>
            <textarea
              className={`${field} h-40 resize-y py-3 leading-relaxed`}
              name="message"
              required
              maxLength={5000}
              placeholder="A few lines about the product, the problem or the question."
            />
          </label>
          <SubmitBtn />
        </form>
      </div>
    </section>
  );
}
