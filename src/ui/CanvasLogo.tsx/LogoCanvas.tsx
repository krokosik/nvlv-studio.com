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
  orbRadiiInDim: 8,
  gasDensity: 0.0001,
  temperature: 5,
  maxLinkThicknessPerRadius: 0.6,
  maxRangePerRadius: 1.7,
  backgroundColor: '#000',
  fillColor: '#fff',
};

export default function LogoCanvas(props: Partial<SimulationParams>) {
  const params = { ...defaultParams, ...props };
  const [simulation, setSimulation] =
    useState<Simulation<SimulationNode, any>>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestIdRef = useRef<number>();

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
      requestIdRef.current = requestAnimationFrame(drawFrame);
    }
    drawFrame();

    function resizeHandler() {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
      resizeCanvasToDisplaySize(canvas, params.square);
      setSimulation(undefined);
    }
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [!simulation]);

  return <canvas ref={canvasRef} className="h-full w-full object-cover" />;
}
