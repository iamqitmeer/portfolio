"use client";

import { useEffect, useState } from "react";
import { ageOn } from "@/lib/data";

/**
 * Current age, recomputed in the browser so a statically built page stays
 * correct after each birthday.
 */
export default function Age() {
  const [age, setAge] = useState(() => ageOn(new Date()));
  useEffect(() => setAge(ageOn(new Date())), []);
  return <span suppressHydrationWarning>{age}</span>;
}
