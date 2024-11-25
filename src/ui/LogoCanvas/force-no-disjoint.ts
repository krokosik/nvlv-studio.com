import type { SimulationNode } from './canvas.utils';
import FlatQueue from 'flatqueue';

interface MSPEdge {
  source: number;
  target: number;
  distance: number;
}

export const minimalSpanningTree = (nodes: SimulationNode[]): MSPEdge[] => {
  // find MSP using Prim's algorithm and distances as weights
  const visited = new Set<SimulationNode>();
  const heap = new FlatQueue<[number, number]>();
  const msp: MSPEdge[] = [];

  visited.add(nodes[0]);

  const addEdges = (nodeIndex: number) => {
    const node = nodes[nodeIndex];
    nodes.forEach((otherNode, otherIndex) => {
      if (visited.has(otherNode)) return;
      const distance = Math.hypot(
        node.x! - otherNode.x!,
        node.y! - otherNode.y!,
      );
      heap.push([nodeIndex, otherIndex], distance);
    });
  };

  addEdges(0);
  let edge: [number, number] | undefined;
  while ((edge = heap.pop())) {
    const [sourceIndex, targetIndex] = edge;
    const source = nodes[sourceIndex];
    const target = nodes[targetIndex];

    if (visited.has(nodes[targetIndex])) continue;
    visited.add(nodes[targetIndex]);

    msp.push({
      source: sourceIndex,
      target: targetIndex,
      distance: Math.hypot(source.x! - target.x!, source.y! - target.y!),
    });

    addEdges(targetIndex);
  }

  return msp;
};
