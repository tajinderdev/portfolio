/**
 * Hero Topology 3D Scene Core Engine
 *
 * Implements a distributed architecture topology in vanilla Three.js:
 * - Edge Clients -> Gateway -> Core Microservices -> Persistence Mesh
 * - Point cloud nodes with tier-based color encoding
 * - Connective network edges with animated telemetry packet pulses
 * - Pointer parallax with clamped lerping
 * - Zero-GPU idle when paused (0% offscreen resource usage)
 * - Deterministic memory cleanup and disposal
 */

import * as THREE from 'three';
import type { TopologySceneController, TopologySceneOptions } from '../types';

interface NodeDefinition {
  x: number;
  y: number;
  z: number;
  r: number;
  g: number;
  b: number;
  tier: number;
}

interface TelemetryPulse {
  startNodeIndex: number;
  endNodeIndex: number;
  progress: number;
  speed: number;
}

export function createTopologyScene(
  container: HTMLElement,
  options?: TopologySceneOptions
): TopologySceneController {
  const isReducedMotion = Boolean(options?.isReducedMotion);
  const isMobile = Boolean(options?.isMobile);
  const targetDpr = Math.min(options?.dpr ?? (typeof window !== 'undefined' ? window.devicePixelRatio : 1), 1.75);

  const width = container.clientWidth || 1000;
  const height = container.clientHeight || 600;

  // 1. Scene & Camera Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
  camera.position.set(0, 0, 32);

  // 2. Canvas & WebGLRenderer Setup
  const canvas = document.createElement('canvas');
  canvas.className = 'w-full h-full block pointer-events-none';
  canvas.style.display = 'block';
  canvas.setAttribute('aria-hidden', 'true');
  container.appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !isMobile,
    powerPreference: 'high-performance',
  });
  renderer.setSize(width, height, false);
  renderer.setPixelRatio(targetDpr);
  renderer.setClearColor(0x000000, 0);

  // 3. Generate Topology Graph Nodes
  // Node counts tuned for desktop (48 nodes) vs mobile (22 nodes)
  const nodeCount = isMobile ? 22 : 48;
  const nodes: NodeDefinition[] = [];

  // Color palettes matching design system
  const colorCyan = { r: 0.0, g: 0.96, b: 0.83 }; // #00F5D4 (Gateway & Edge)
  const colorSky = { r: 0.22, g: 0.74, b: 0.97 }; // #38BDF8 (Cloud & Infrastructure)
  const colorEmerald = { r: 0.2, g: 0.83, b: 0.6 }; // #34D399 (Core Services)
  const colorSlate = { r: 0.45, g: 0.52, b: 0.62 }; // #718096 (Data Persistence)

  for (let i = 0; i < nodeCount; i++) {
    // Distribute into 5 architectural tiers along the X axis
    const tier = i % 5;
    let xRange = [-14, -8];
    let color = colorCyan;

    if (tier === 1) {
      xRange = [-7, -2];
      color = colorSky;
    } else if (tier === 2) {
      xRange = [-1, 4];
      color = colorEmerald;
    } else if (tier === 3) {
      xRange = [5, 9];
      color = colorCyan;
    } else if (tier === 4) {
      xRange = [10, 15];
      color = colorSlate;
    }

    const x = xRange[0] + Math.random() * (xRange[1] - xRange[0]);
    const y = (Math.random() - 0.5) * 16;
    const z = (Math.random() - 0.5) * 8;

    nodes.push({
      x,
      y,
      z,
      r: color.r,
      g: color.g,
      b: color.b,
      tier,
    });
  }

  // 4. Build Node Point Cloud Geometry
  const nodePositions = new Float32Array(nodeCount * 3);
  const nodeColors = new Float32Array(nodeCount * 3);

  nodes.forEach((node, idx) => {
    nodePositions[idx * 3] = node.x;
    nodePositions[idx * 3 + 1] = node.y;
    nodePositions[idx * 3 + 2] = node.z;

    nodeColors[idx * 3] = node.r;
    nodeColors[idx * 3 + 1] = node.g;
    nodeColors[idx * 3 + 2] = node.b;
  });

  const nodeGeometry = new THREE.BufferGeometry();
  nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
  nodeGeometry.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));

  const nodeMaterial = new THREE.PointsMaterial({
    size: isMobile ? 3.0 : 3.8,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: true,
  });

  const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial);
  scene.add(nodePoints);

  // 5. Build Connective Network Edges
  const edgeLinePositions: number[] = [];
  const edgeLineColors: number[] = [];
  const connectedPairs: [number, number][] = [];

  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      const nodeA = nodes[i];
      const nodeB = nodes[j];

      // Connect nodes in adjacent tiers within proximity distance
      const tierDiff = Math.abs(nodeA.tier - nodeB.tier);
      if (tierDiff <= 1) {
        const dx = nodeA.x - nodeB.x;
        const dy = nodeA.y - nodeB.y;
        const dz = nodeA.z - nodeB.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < (isMobile ? 7.5 : 8.5)) {
          connectedPairs.push([i, j]);

          edgeLinePositions.push(nodeA.x, nodeA.y, nodeA.z);
          edgeLinePositions.push(nodeB.x, nodeB.y, nodeB.z);

          // Subtle blend towards cyan/slate
          edgeLineColors.push(nodeA.r * 0.5, nodeA.g * 0.5, nodeA.b * 0.5);
          edgeLineColors.push(nodeB.r * 0.5, nodeB.g * 0.5, nodeB.b * 0.5);
        }
      }
    }
  }

  const edgeGeometry = new THREE.BufferGeometry();
  edgeGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(edgeLinePositions, 3)
  );
  edgeGeometry.setAttribute(
    'color',
    new THREE.Float32BufferAttribute(edgeLineColors, 3)
  );

  const edgeMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
  });

  const edgeSegments = new THREE.LineSegments(edgeGeometry, edgeMaterial);
  scene.add(edgeSegments);

  // 6. Build Live Telemetry Packet Pulses
  const pulseCount = Math.min(connectedPairs.length, isMobile ? 6 : 14);
  const pulses: TelemetryPulse[] = [];

  for (let i = 0; i < pulseCount; i++) {
    const pairIndex = Math.floor(Math.random() * connectedPairs.length);
    const pair = connectedPairs[pairIndex] || [0, 1];
    pulses.push({
      startNodeIndex: pair[0],
      endNodeIndex: pair[1],
      progress: Math.random(),
      speed: 0.15 + Math.random() * 0.25,
    });
  }

  const pulsePositions = new Float32Array(pulseCount * 3);
  const pulseGeometry = new THREE.BufferGeometry();
  pulseGeometry.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));

  const pulseMaterial = new THREE.PointsMaterial({
    size: 4.2,
    color: 0x00f5d4,
    transparent: true,
    opacity: 0.95,
    sizeAttenuation: true,
  });

  const pulsePoints = new THREE.Points(pulseGeometry, pulseMaterial);
  scene.add(pulsePoints);

  // 7. Interaction & Parallax State
  let targetPointerX = 0;
  let targetPointerY = 0;
  let currentRotX = 0;
  let currentRotY = 0;
  let isPaused = false;
  let animationFrameId: number | null = null;
  let lastTime = typeof performance !== 'undefined' ? performance.now() : 0;

  function updateTelemetry(dt: number) {
    const posAttr = pulseGeometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    pulses.forEach((pulse, idx) => {
      pulse.progress += pulse.speed * dt;
      if (pulse.progress >= 1.0) {
        pulse.progress = 0;
        // Optionally cycle to a new connected route
        const newPair = connectedPairs[Math.floor(Math.random() * connectedPairs.length)];
        if (newPair) {
          pulse.startNodeIndex = newPair[0];
          pulse.endNodeIndex = newPair[1];
        }
      }

      const a = nodes[pulse.startNodeIndex];
      const b = nodes[pulse.endNodeIndex];

      if (a && b) {
        array[idx * 3] = a.x + (b.x - a.x) * pulse.progress;
        array[idx * 3 + 1] = a.y + (b.y - a.y) * pulse.progress;
        array[idx * 3 + 2] = a.z + (b.z - a.z) * pulse.progress;
      }
    });

    posAttr.needsUpdate = true;
  }

  function renderFrame(now: number) {
    if (isPaused) return;

    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    if (!isReducedMotion) {
      // Smoothly ease rotation towards pointer coordinates (clamped to +/- 0.06 rad)
      currentRotX += (targetPointerY * 0.05 - currentRotX) * 0.05;
      currentRotY += (targetPointerX * 0.06 - currentRotY) * 0.05;

      // Subtle ambient drift
      const elapsed = now * 0.0004;
      scene.rotation.x = currentRotX + Math.sin(elapsed) * 0.02;
      scene.rotation.y = currentRotY + Math.cos(elapsed * 0.8) * 0.03;

      updateTelemetry(dt);
    }

    renderer.render(scene, camera);

    if (!isReducedMotion) {
      animationFrameId = requestAnimationFrame(renderFrame);
    }
  }

  // Initial render
  renderer.render(scene, camera);
  if (!isReducedMotion) {
    animationFrameId = requestAnimationFrame(renderFrame);
  }

  // 8. Controller API
  return {
    domElement: canvas,

    setPointer(x: number, y: number) {
      targetPointerX = Math.max(-1, Math.min(1, x));
      targetPointerY = Math.max(-1, Math.min(1, y));
    },

    pause() {
      isPaused = true;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    },

    resume() {
      if (!isPaused && animationFrameId !== null) return;
      isPaused = false;
      lastTime = typeof performance !== 'undefined' ? performance.now() : 0;
      if (!isReducedMotion) {
        animationFrameId = requestAnimationFrame(renderFrame);
      } else {
        renderer.render(scene, camera);
      }
    },

    resize(newWidth: number, newHeight: number) {
      if (!newWidth || !newHeight) return;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight, false);
      renderer.render(scene, camera);
    },

    dispose() {
      isPaused = true;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }

      // Explicitly dispose all geometries
      nodeGeometry.dispose();
      edgeGeometry.dispose();
      pulseGeometry.dispose();

      // Explicitly dispose all materials
      nodeMaterial.dispose();
      edgeMaterial.dispose();
      pulseMaterial.dispose();

      // Safely detach canvas from DOM
      if (canvas.parentElement) {
        canvas.parentElement.removeChild(canvas);
      }

      // Dispose renderer and force context loss to prevent WebGL memory leak
      renderer.dispose();
      if (typeof renderer.forceContextLoss === 'function') {
        renderer.forceContextLoss();
      }
    },
  };
}
