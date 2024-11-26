import FlatQueue from 'flatqueue';

interface MSPEdge {
  source: number;
  target: number;
  distance: number;
}

const visited = new Set<{ x: number; y: number }>();
const heap = new FlatQueue<[number, number]>();

const addEdges = (nodes: { x: number; y: number }[], nodeIndex: number) => {
  const node = nodes[nodeIndex];
  nodes.forEach((otherNode, otherIndex) => {
    if (visited.has(otherNode)) return;
    const distance = Math.hypot(node.x - otherNode.x, node.y - otherNode.y);
    heap.push([nodeIndex, otherIndex], distance);
  });
};

export const minimalSpanningTree = (
  nodes: { x: number; y: number }[],
): MSPEdge[] => {
  // find MSP using Prim's algorithm and distances as weights
  visited.clear();
  heap.clear();
  const msp: MSPEdge[] = Array(nodes.length - 1);

  visited.add(nodes[0]);

  addEdges(nodes, 0);
  let edge: [number, number] | undefined;
  while ((edge = heap.pop())) {
    const [sourceIndex, targetIndex] = edge;
    const source = nodes[sourceIndex];
    const target = nodes[targetIndex];

    if (visited.has(nodes[targetIndex])) continue;
    visited.add(nodes[targetIndex]);

    msp[visited.size - 2] = {
      source: sourceIndex,
      target: targetIndex,
      distance: Math.hypot(source.x - target.x, source.y - target.y),
    };

    addEdges(nodes, targetIndex);
  }

  return msp;
};
