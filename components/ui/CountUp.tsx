"use client";

import React from "react";

type CountUpProps = {
  from?: number;
  to: number;
  durationMs?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimalPlaces?: number;
  minIntegerDigits?: number;
};

export default function CountUp({
  from = 0,
  to,
  durationMs = 1200,
  className,
  prefix = "",
  suffix = "",
  decimalPlaces = 0,
  minIntegerDigits,
}: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const [isActive, setIsActive] = React.useState(false);
  const [displayValue, setDisplayValue] = React.useState(from);

  // Trigger when in view
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsActive(entry.isIntersecting);
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Animate value
  React.useEffect(() => {
    if (!isActive) return;

    let frameId = 0;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / durationMs);
      // Ease-out cubic for a pleasant finish
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (to - from) * eased;
      setDisplayValue(current);
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isActive, from, to, durationMs]);

  // Reset value when it leaves the viewport so it can re-animate on next enter
  React.useEffect(() => {
    if (!isActive) {
      setDisplayValue(from);
    }
  }, [isActive, from]);

  const formatted = React.useMemo(() => {
    const factor = Math.pow(10, decimalPlaces);
    const rounded = Math.round(displayValue * factor) / factor;
    return `${prefix}${rounded.toLocaleString(undefined, {
      minimumIntegerDigits: minIntegerDigits,
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    })}${suffix}`;
  }, [displayValue, prefix, suffix, decimalPlaces, minIntegerDigits]);

  return (
    <span
      ref={ref}
      className={className}
      aria-label={`${prefix}${to}${suffix}`}
    >
      {formatted}
    </span>
  );
}
