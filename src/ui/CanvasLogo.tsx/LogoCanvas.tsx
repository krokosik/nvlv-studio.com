'use client';
import { useDebounceCallback } from '@react-hook/debounce';
import useResizeObserver from '@react-hook/resize-observer';
import { useCallback, useRef } from 'react';

import {
  draw,
  initSimulation,
  resizeCanvasToDisplaySize,
} from './canvas.utils';

export interface SimulationParams {
  orbRadiiInDim: number;
  gasDensity: number;
  temperature: number;
  maxLinkThicknessPerRadius: number;
  maxRangePerRadius: number;
  backgroundColor: string;
  fillColor: string;
  square?: boolean;
}

const defaultParams: SimulationParams = {
  orbRadiiInDim: 20 / 3,
  gasDensity: 0.0001,
  temperature: 5,
  maxLinkThicknessPerRadius: 0.5,
  maxRangePerRadius: 3 / 2,
  backgroundColor: '#000',
  fillColor: '#fff',
};

export default function LogoCanvas(props: Partial<SimulationParams>) {
  const params = { ...defaultParams, ...props };
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const setup = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    resizeCanvasToDisplaySize(canvas, params.square);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;

    const simulation = initSimulation({ ...params, width, height });

    intervalIdRef.current = setInterval(() => {
      if (!ctx || !simulation) return;
      simulation?.tick();
      draw(ctx, { ...params, width, height }, simulation);
    }, 1000 / 60);
  }, [params, canvasRef.current]);

  const setupDebounced = useDebounceCallback(setup, 200, true);

  useResizeObserver(canvasRef, setupDebounced);

  return <canvas ref={canvasRef} className="h-full w-full object-cover" />;
}
