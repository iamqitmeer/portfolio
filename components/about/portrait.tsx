"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import Age from "../age";

/**
 * Portrait in a rotating gradient frame. The card tilts toward the pointer and
 * the floating chips sit on different depths, so they parallax against it.
 */
export default function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 18 });
  const chipX = useSpring(useTransform(px, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 16 });
  const chipY = useSpring(useTransform(py, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 16 });

  return (
    <div
      ref={ref}
      className="relative ml-auto w-full max-w-[24rem] [perspective:1200px]"
      onPointerMove={(e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <motion.div style={reduce ? undefined : { rotateX: rx, rotateY: ry }} className="relative [transform-style:preserve-3d]">
        {/* rotating gradient frame */}
        <div className="relative overflow-hidden rounded-[26px] p-[2px]">
          <div
            aria-hidden
            className="absolute inset-[-50%] animate-[spin_9s_linear_infinite] motion-reduce:animate-none"
            style={{
              background:
                "conic-gradient(from 0deg, rgb(143 127 224 / 0.1), rgb(218 209 249 / 0.9), rgb(255 181 71 / 0.8), rgb(143 127 224 / 0.1) 60%, rgb(143 127 224 / 0.1))",
            }}
          />
          <div className="relative rounded-[24px] bg-ink p-2">
            <Image
              src="/qitmeer.jpg"
              alt="Portrait of Qitmeer Raza"
              width={400}
              height={400}
              priority
              className="aspect-[4/4.4] w-full rounded-[18px] object-cover"
            />
            <div className="flex items-center justify-between px-3 pb-2 pt-4 text-[0.875rem]">
              <span className="font-semibold">Qitmeer Raza</span>
              <span className="flex items-center gap-2 text-dim">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                Korangi, Karachi
              </span>
            </div>
          </div>
        </div>

        {/* floating chips at different depths */}
        <motion.span
          style={reduce ? undefined : { x: chipX, y: chipY, translateZ: 60 }}
          className="absolute left-3 top-6 rounded-2xl border border-line bg-raised/90 px-4 py-3 shadow-[0_20px_40px_-15px_rgb(0_0_0/0.8)] backdrop-blur-md md:-left-12 md:top-10"
        >
          <span className="block font-brand text-[1.75rem] font-bold leading-none tracking-[-0.04em]">
            <Age />
          </span>
          <span className="mt-1 block text-[0.75rem] text-dim">years old</span>
        </motion.span>
        <motion.span
          style={reduce ? undefined : { x: chipX, y: chipY, translateZ: 90 }}
          className="absolute bottom-20 right-3 flex items-center gap-2 rounded-full border border-signal/30 bg-ink/90 px-3.5 py-2 text-[0.8125rem] font-semibold text-signal shadow-[0_20px_40px_-15px_rgb(0_0_0/0.8)] backdrop-blur-md md:-right-8 md:bottom-24"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
          Founder, Augere Labs
        </motion.span>
      </motion.div>
    </div>
  );
}
