'use client';
import { useDebounceCallback } from '@react-hook/debounce';
import useResizeObserver from 'use-resize-observer';
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
  const ref = useRef<HTMLCanvasElement>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const setup = useCallback(() => {
    if (!ref.current) return;

    const canvas = ref.current;
    const needsResize = resizeCanvasToDisplaySize(canvas, params.square);

    if (!needsResize) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;

    const simulation = initSimulation({ ...params, width, height });

    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    intervalIdRef.current = setInterval(() => {
      if (!ctx || !simulation) return;
      simulation?.tick();
      draw(ctx, { ...params, width, height }, simulation);
    }, 1000 / 60);
  }, [params, ref.current]);

  const setupDebounced = useDebounceCallback(setup, 500, true);

  useResizeObserver({ ref, onResize: setupDebounced });

  return <canvas ref={ref} className="h-full w-full object-cover" />;
}
