'use client';

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [isActive, setIsActive] = useState(false);
  const [withinWindow, setWithinWindow] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointerFine] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return !window.matchMedia("(pointer: coarse)").matches;
  });

  useEffect(() => {
    if (!isPointerFine || typeof window === "undefined") {
      return;
    }

    const handleMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);
    const handleLeave = () => setWithinWindow(false);
    const handleEnter = () => setWithinWindow(true);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("mouseenter", handleEnter);

    const hoverables = document.querySelectorAll("a, button, input, textarea, [data-cursor=interactive]");
    const handleEnterInteractive = () => setIsActive(true);
    const handleLeaveInteractive = () => setIsActive(false);
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", handleEnterInteractive);
      el.addEventListener("mouseleave", handleLeaveInteractive);
      el.addEventListener("focusin", handleEnterInteractive);
      el.addEventListener("focusout", handleLeaveInteractive);
    });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("mouseenter", handleEnter);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnterInteractive);
        el.removeEventListener("mouseleave", handleLeaveInteractive);
        el.removeEventListener("focusin", handleEnterInteractive);
        el.removeEventListener("focusout", handleLeaveInteractive);
      });
    };
  }, [isPointerFine]);

  if (!isPointerFine || !withinWindow) return null;

  return (
    <div
      aria-hidden
      className={`custom-cursor ${isActive ? "cursor-active" : ""}`}
      style={{ left: position.x, top: position.y }}
    />
  );
}
