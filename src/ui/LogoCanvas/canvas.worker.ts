import { Simulation } from 'd3-force-md';
import {
  draw,
  initSimulation,
  SimulationNode,
  SimulationParams,
} from './canvas.utils';

let simulation: Simulation<SimulationNode, any> | undefined;
let canvas: OffscreenCanvas;
let ctx: OffscreenCanvasRenderingContext2D;
let animationFrameId: number;
let params: SimulationParams;

let lastTime = 0;
const TARGET_FPS = 60;
const FRAME_TIME = 1000 / TARGET_FPS;

function createOffscreenCanvas(width: number, height: number) {
  canvas = new OffscreenCanvas(width, height);
  ctx = canvas.getContext('2d')!;
}

self.onmessage = (e: MessageEvent) => {
  const { type, width, height, newParams } = e.data;

  switch (type) {
    case 'init': {
      params = newParams;
      createOffscreenCanvas(width, height);
      simulation = initSimulation({ ...params, width, height });
      animate(0);
      break;
    }

    case 'resize': {
      createOffscreenCanvas(width, height);
      simulation = initSimulation({ ...params, width, height });
      break;
    }

    case 'params': {
      params = newParams;
      simulation = initSimulation({
        ...params,
        width: canvas.width,
        height: canvas.height,
      });
      break;
    }

    case 'stop': {
      cancelAnimationFrame(animationFrameId);
      break;
    }
    default:
      break;
  }
};

function animate(timestamp: number) {
  if (!simulation || !ctx) return;

  const deltaTime = timestamp - lastTime;

  // Only update if enough time has passed
  if (deltaTime >= FRAME_TIME) {
    simulation?.tick();
    draw(
      ctx,
      { ...params, width: canvas.width, height: canvas.height },
      simulation,
    );

    const imageBitmap = canvas.transferToImageBitmap();
    self.postMessage({ type: 'frame', image: imageBitmap });

    lastTime = timestamp - (deltaTime % FRAME_TIME); // Adjust for any remainder
  }

  animationFrameId = requestAnimationFrame(animate);
}
