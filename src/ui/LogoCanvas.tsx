'use client';
import { forceSimulation, Simulation, SimulationNodeDatum } from 'd3-force';
import { MutableRefObject, useEffect, useRef } from 'react';

import d3ForceBounce from 'd3-force-bounce';
import d3ForceSurface from 'd3-force-surface';
import Image from 'next/image';
import LogoText from './logo-text.png';
import { IoLogoInstagram } from 'react-icons/io';
import { MdOutlineEmail } from 'react-icons/md';

export interface SimulationParams {
  orbRadius?: number;
  gasRadius?: number;
  numDustParticales?: number;
  numOrbs: number;
  gasDensity: number;
  temperature: number;
  showOrbs: boolean;
  showGas: boolean;
  showLinks: boolean;
  background: number[];
  fill: number[];
  gas: number[];
}

export interface SimulationNode extends SimulationNodeDatum {
  type: 'orb' | 'gas';
  r: number;
}

const defaultParams: SimulationParams = {
  numOrbs: 5,
  gasDensity: 0.0001,
  temperature: 10,
  showOrbs: true,
  showGas: false,
  showLinks: true,
  background: [0, 0, 0],
  fill: [255, 255, 255],
  gas: [255, 0, 0, 0.3],
};

export default function LogoCanvas(props: Partial<SimulationParams>) {
  const params = { ...defaultParams, ...props };
  const simulation = useRef<Simulation<SimulationNode, any>>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    resizeCanvasToDisplaySize(canvas);

    function resizeHandler() {
      console.log('resizeHandler');
      resizeCanvasToDisplaySize(canvas);
    }
    window.addEventListener('resize', resizeHandler);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;

    params.orbRadius = Math.min(width, height) / 8;
    params.gasRadius = Math.max(1, Math.sqrt(params.orbRadius) / 2);
    params.numDustParticales = params.gasDensity * width * height;

    const nodes = initOrbs(params, width, height);

    simulation.current = forceSimulation(nodes)
      .alphaDecay(0)
      .velocityDecay(0)
      .force(
        'bounce',
        d3ForceBounce().radius((d: SimulationNode) => d.r),
      )
      .force(
        'surface',
        d3ForceSurface()
          .surfaces([
            { from: { x: width, y: 0 }, to: { x: 0, y: 0 } },
            { from: { x: width, y: height }, to: { x: width, y: 0 } },
            { from: { x: 0, y: height }, to: { x: width, y: height } },
            { from: { x: 0, y: 0 }, to: { x: 0, y: height } },
          ])
          .oneWay(true)
          .radius((d: SimulationNode) => d.r),
      )
      .on('tick', () => {});

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [
    canvasRef.current?.clientHeight,
    canvasRef.current?.clientWidth,
    params.orbRadius,
    params.gasRadius,
    params.numDustParticales,
    params.numOrbs,
    params.gasDensity,
    params.temperature,
  ]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    draw(ctx, params, simulation);
  }, [canvasRef.current, simulation.current]);

  return (
    <div className="w-dvh space-around flex h-dvh flex-col justify-center gap-8 px-8">
      <h1 className="text-center text-3xl font-light md:text-4xl">
        Website under construction...
      </h1>
      <div className="flex flex-col-reverse items-center justify-center gap-8 md:flex-row md:gap-0">
        <div className="aspect-square w-1/2 md:w-1/3">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>
        <div className="relative w-4/5 md:w-2/3 md:pt-[33%]">
          <Image
            src={LogoText}
            alt="Logo Text"
            className="bottom-0 left-0 right-0 top-0 mx-auto object-contain md:absolute md:h-full"
          />
        </div>
      </div>
      <div className="mx-auto flex gap-8 text-7xl">
        <a title="Email" href="mailto:contact@nvlv-studio.com">
          <MdOutlineEmail />
        </a>
        <a title="Instagram" href="https://www.instagram.com/nvlv.studio">
          <IoLogoInstagram />
        </a>
      </div>
    </div>
  );
}

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement): void {
  // Lookup the size the browser is displaying the canvas in CSS pixels.
  const dpr = window.devicePixelRatio;
  const displayWidth = Math.round(canvas.clientWidth * dpr);
  const displayHeight = Math.round(canvas.clientHeight * dpr);

  // Check if the canvas is not the same size.
  const needResize =
    canvas.width != displayWidth || canvas.height != displayHeight;

  if (needResize) {
    // Make the canvas the same size
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }
}

function draw(
  ctx: CanvasRenderingContext2D,
  params: SimulationParams,
  simulation?: MutableRefObject<Simulation<SimulationNode, any> | undefined>,
) {
  const nodes = simulation?.current?.nodes();
  if (!nodes) {
    return;
  }
  ctx.fillStyle = `rgba(${params.background.join(',')})`;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  if (params.showOrbs) {
    ctx.fillStyle = `rgba(${params.fill.join(',')})`;
    for (const node of nodes.slice(0, params.numOrbs)) {
      if (node.type === 'orb') {
        ctx.beginPath();
        ctx.arc(node.x!, node.y!, node.r, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }

  if (params.showGas) {
    for (const node of nodes.slice(params.numOrbs)) {
      if (node.type === 'gas') {
        ctx.fillStyle = `rgba(${params.gas.join(',')})`;
        ctx.beginPath();
        ctx.arc(node.x!, node.y!, node.r, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }

  if (params.showLinks) {
    for (let i = 0; i < params.numOrbs; i++) {
      for (let j = i + 1; j < params.numOrbs; j++) {
        const distance = Math.hypot(
          nodes[i].x! - nodes[j].x!,
          nodes[i].y! - nodes[j].y!,
        );

        const thickness = Math.sqrt(
          Math.max(
            (params.orbRadius! / 4) ** 2 -
              (distance - 2 * params.orbRadius!) ** 2 / 25,
            0,
          ),
        );

        if (thickness <= 0 || isNaN(thickness)) continue;

        ctx.beginPath();
        ctx.moveTo(nodes[i].x!, nodes[i].y!);
        ctx.lineTo(nodes[j].x!, nodes[j].y!);
        ctx.lineWidth = thickness;
        ctx.strokeStyle = `rgba(${params.fill.join(',')})`;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(() => draw(ctx, params, simulation));
}

function initOrbs(
  params: SimulationParams,
  width: number,
  height: number,
): SimulationNode[] {
  const nodes: SimulationNode[] = [];

  if (params.orbRadius) {
    for (let i = 0; i < params.numOrbs; i++) {
      nodes.push({
        type: 'orb',
        x: random(params.orbRadius * 1.2, width - params.orbRadius * 1.2),
        y: random(params.orbRadius * 1.2, height - params.orbRadius * 1.2),
        vx: 0,
        vy: 0,
        r: params.orbRadius,
      });
    }
  }

  if (params.gasRadius && params.numDustParticales) {
    for (let i = 0; i < params.numDustParticales; i++) {
      nodes.push({
        type: 'gas',
        x: random(params.gasRadius, width - params.gasRadius),
        y: random(params.gasRadius, height - params.gasRadius),
        vx: gaussianRandom(0, params.temperature),
        vy: gaussianRandom(0, params.temperature),
        r: params.gasRadius,
      });
    }
  }

  return nodes;
}

function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function gaussianRandom(mean = 0, stdev = 1): number {
  const u = 1 - Math.random(); // Converting [0,1) to (0,1]
  const v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  // Transform to the desired mean and standard deviation:
  return z * stdev + mean;
}
