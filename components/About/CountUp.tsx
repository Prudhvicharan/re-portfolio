"use client";

import { useEffect, useRef, useState } from "react";

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export default function CountUp({
  end,
  suffix = "",
  duration = 1800,
}: {
  end: number | string;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState<number | string>(typeof end === "string" ? end : 0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (typeof end === "string") {
      setCount(end);
      return;
    }

    const startTime = performance.now();
    const endNum = end as number;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      setCount(Math.round(eased * endNum * 10) / 10);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      }
    };
    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [end, duration]);

  return <>{count}{suffix}</>;
}
