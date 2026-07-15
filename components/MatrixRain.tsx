"use client";

import { useEffect, useRef } from "react";

type Column = {
  x: number;
  stack: number;
  height: number;
  color: string;
};

const FRAME_DELAY = 70;
const FONT_SIZE = 16;
const TILE_SIZE = FONT_SIZE + 2;
const FADE_FACTOR = 0.07;
const PRIMARY_COLOR = "#e05b62";
const SECONDARY_COLOR = "#a61d3d";

function randomChar() {
  return String.fromCharCode(Math.floor(Math.random() * (126 - 33) + 33));
}

function randomColor() {
  return Math.random() < 0.1 ? SECONDARY_COLOR : PRIMARY_COLOR;
}

function randomHeight() {
  return Math.floor(Math.random() * 40) + 10;
}

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let columns: Column[] = [];
    let frameId = 0;
    let lastFrame = 0;
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;

    const initializeColumns = () => {
      const columnCount = Math.floor(viewportWidth / TILE_SIZE);
      columns = Array.from({ length: columnCount }, (_, index) => ({
        x: index * TILE_SIZE,
        stack: Math.floor(Math.random() * 12),
        height: randomHeight(),
        color: randomColor(),
      }));
    };

    const resizeCanvas = () => {
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(viewportWidth * pixelRatio);
      canvas.height = Math.floor(viewportHeight * pixelRatio);
      canvas.style.width = `${viewportWidth}px`;
      canvas.style.height = `${viewportHeight}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      initializeColumns();
    };

    const draw = (now: number) => {
      frameId = 0;

      if (document.hidden || reducedMotion.matches) return;

      if (now - lastFrame >= FRAME_DELAY) {
        lastFrame = now;
        context.globalAlpha = 1;
        context.fillStyle = `rgba(0, 0, 0, ${FADE_FACTOR})`;
        context.fillRect(0, 0, viewportWidth, viewportHeight);

        context.font = `${FONT_SIZE}px monospace`;
        context.textBaseline = "alphabetic";
        context.globalAlpha = 0.3;

        columns.forEach((column) => {
          context.fillStyle = column.color;
          context.fillText(
            randomChar(),
            column.x,
            column.stack * TILE_SIZE,
          );

          column.stack += 1;

          if (
            column.stack > column.height ||
            column.stack * TILE_SIZE > viewportHeight + TILE_SIZE
          ) {
            column.stack = 0;
            column.height = randomHeight();
            column.color = randomColor();
          }
        });
      }

      frameId = window.requestAnimationFrame(draw);
    };

    const start = () => {
      if (frameId || document.hidden || reducedMotion.matches) return;
      lastFrame = performance.now();
      frameId = window.requestAnimationFrame(draw);
    };

    const stop = () => {
      if (!frameId) return;
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    const handleMotionChange = () => {
      if (reducedMotion.matches) {
        stop();
        context.clearRect(0, 0, viewportWidth, viewportHeight);
      } else {
        resizeCanvas();
        start();
      }
    };

    resizeCanvas();
    start();

    window.addEventListener("resize", resizeCanvas, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotion.addEventListener("change", handleMotionChange);

    return () => {
      stop();
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotion.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="matrix-rain"
      aria-hidden="true"
      role="presentation"
    />
  );
}
