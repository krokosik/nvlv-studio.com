'use client';
import { Simulation } from 'd3-force';
import { useEffect, useRef, useState } from 'react';

import {
  draw,
  initSimulation,
  NUM_ORBS,
  resizeCanvasToDisplaySize,
  SimulationNode,
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
  const [simulation, setSimulation] =
    useState<Simulation<SimulationNode, any>>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    resizeCanvasToDisplaySize(canvas, params.square);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;

    const orbRadius = Math.min(width, height) / params.orbRadiiInDim;
    const gasRadius = Math.max(1, Math.sqrt(orbRadius) / 2);
    const {
      backgroundColor,
      fillColor,
      gasDensity,
      temperature,
      maxLinkThicknessPerRadius,
      maxRangePerRadius,
    } = params;

    setSimulation(
      initSimulation(
        gasDensity,
        orbRadius,
        gasRadius,
        temperature,
        width,
        height,
      ),
    );

    function drawFrame() {
      if (!ctx || !simulation) return;
      simulation?.tick();
      draw(
        ctx,
        NUM_ORBS,
        orbRadius,
        { background: backgroundColor, fill: fillColor },
        maxLinkThicknessPerRadius,
        maxRangePerRadius,
        simulation,
      );
    }

    intervalIdRef.current = setInterval(drawFrame, 1000 / 60);

    function resizeHandler() {
      if (!resizeCanvasToDisplaySize(canvas, params.square)) return;

      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
      setSimulation(undefined);
    }
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [!simulation]);

  return <canvas ref={canvasRef} className="h-full w-full object-cover" />;
}
