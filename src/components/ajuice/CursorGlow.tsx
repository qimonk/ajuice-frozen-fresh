'use client';

import { useEffect, useState, useCallback } from 'react';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [isTouch, setIsTouch] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    // Detect touch device
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    if (isTouchDevice) {
      setIsTouch(true);
      return;
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  if (isTouch) return null;

  return (
    <div
      className="cursor-glow hidden lg:block"
      style={{
        left: position.x,
        top: position.y,
      }}
    />
  );
}
