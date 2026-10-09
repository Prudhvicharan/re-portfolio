"use client";
import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", hour: "numeric", minute: "2-digit" });

// Local time in Kansas City; rendered after hydration so the static export stays stable.
export default function Clock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);
  return <span className="live">Kansas City{time ? ` · ${time}` : ""}</span>;
}
