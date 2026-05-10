'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -300, y: -300 });
  const [isTouch, setIsTouch] = useState(false);
  const smoothPos = useRef({ x: -300, y: -300 });
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    if (isTouchDevice) {
      setIsTouch(true);
      return;
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Smooth follow with rAF
    const animate = () => {
      smoothPos.current.x += (position.x - smoothPos.current.x) * 0.08;
      smoothPos.current.y += (position.y - smoothPos.current.y) * 0.08;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, position.x, position.y]);

  if (isTouch) return null;

  return (
    <div
      className="cursor-glow hidden lg:block"
      style={{
        left: smoothPos.current.x,
        top: smoothPos.current.y,
      }}
    />
  );
}
