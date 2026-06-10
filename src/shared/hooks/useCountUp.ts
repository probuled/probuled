import { useRef, useState, useEffect, RefObject } from 'react';

export function useCountUp(target: number, decimals = 0): [RefObject<HTMLDivElement>, string | number] {
  const ref = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId: number;
    let started = false;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true;
          const dur = 1400;
          const t0  = performance.now();
          const tick = (t: number) => {
            const p     = Math.min(1, (t - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(target * eased);
            if (p < 1) {
              rafId = requestAnimationFrame(tick);
            } else {
              setVal(target);
            }
          };
          rafId = requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [target]);

  return [ref, decimals ? val.toFixed(decimals) : Math.round(val)];
}
