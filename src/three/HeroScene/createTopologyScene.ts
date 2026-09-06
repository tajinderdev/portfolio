/**
 * Hero Topology 3D Scene Core Engine (Tangible 3D Overhaul)
 *
 * Implements a tangible, interactive distributed architecture system in Three.js:
 * - Solid 3D Server Blocks & Microservice Nodes with glowing neon wireframe edges
 * - Central architectural core lattice with dynamic point lighting
 * - Connective 3D data conduits with moving telemetry packets
 * - Interactive Raycaster: mouse hover scales and highlights architectural nodes
 * - Scroll-driven exploded architecture transformation
 * - 0% offscreen GPU idle when paused
 * - Deterministic memory cleanup and disposal
 */

import * as THREE from 'three';
import type { TopologySceneController, TopologySceneOptions } from '../types';

interface ServerNode {
  meshGroup: THREE.Group;
  basePosition: THREE.Vector3;
  currentPosition: THREE.Vector3;
  baseScale: number;
  targetScale: number;
  tier: number;
  color: THREE.Color;
  wireframeLines: THREE.LineSegments;
  boxMesh: THREE.Mesh;
}

interface TelemetryConduit {
  startNode: ServerNode;
  endNode: ServerNode;
  pulseProgress: number;
  pulseSpeed: number;
  pulseMesh: THREE.Mesh;
}

export function createTopologyScene(
  container: HTMLElement,
  options?: TopologySceneOptions
): TopologySceneController {
  const isReducedMotion = Boolean(options?.isReducedMotion);
  const isMobile = Boolean(options?.isMobile);
  const targetDpr = Math.min(
    options?.dpr ?? (typeof window !== 'undefined' ? window.devicePixelRatio : 1),
    1.75
  );

  const width = container.clientWidth || 1000;
  const height = container.clientHeight || 600;

  // 1. Scene, Camera & Lighting
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
  camera.position.set(0, 0, 32);

  // Canvas & WebGLRenderer Setup
  const canvas = document.createElement('canvas');
  canvas.className = 'w-full h-full block';
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

  // Dynamic Scene Lighting for real 3D depth
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambientLight);

  const coreLight = new THREE.PointLight(0x00f5d4, 3.5, 45);
  coreLight.position.set(0, 0, 5);
  scene.add(coreLight);

  const keyLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
  keyLight.position.set(15, 20, 25);
  scene.add(keyLight);

  // 2. Shared Geometries and Materials for performance
  const boxGeo = new THREE.BoxGeometry(1.6, 1.2, 1.2);
  const edgesGeo = new THREE.EdgesGeometry(boxGeo);
  const sphereGeo = new THREE.SphereGeometry(0.32, 12, 12);
  const pulseGeo = new THREE.SphereGeometry(0.22, 8, 8);

  const pulseMat = new THREE.MeshBasicMaterial({
    color: 0x00f5d4,
    transparent: true,
    opacity: 0.95,
  });

  // Color Tiers:
  // Tier 0: Gateway & Ingress (#00F5D4 cyan)
  // Tier 1: Cloud & Cluster (#38BDF8 sky blue)
  // Tier 2: Core Microservices (#34D399 emerald)
  // Tier 3: Persistence & Database (#818CF8 indigo)
  // Tier 4: Storage & Infrastructure (#F59E0B amber)
  const tierColors = [
    new THREE.Color(0x00f5d4),
    new THREE.Color(0x38bdf8),
    new THREE.Color(0x34d399),
    new THREE.Color(0x818cf8),
    new THREE.Color(0xf59e0b),
  ];

  // 3. Build Solid 3D Architectural Nodes
  const nodeCount = isMobile ? 12 : 26;
  const serverNodes: ServerNode[] = [];
  const raycastMeshes: THREE.Mesh[] = [];

  for (let i = 0; i < nodeCount; i++) {
    const tier = i % 5;
    const color = tierColors[tier] ?? tierColors[0]!;

    // Distribute tiers along X-axis to communicate pipeline flow
    let minX = -13;
    let maxX = -8;
    if (tier === 1) {
      minX = -7;
      maxX = -2;
    } else if (tier === 2) {
      minX = -1;
      maxX = 4;
    } else if (tier === 3) {
      minX = 5;
      maxX = 9;
    } else if (tier === 4) {
      minX = 10;
      maxX = 14;
    }

    const x = minX + Math.random() * (maxX - minX);
    const y = (Math.random() - 0.5) * 12;
    const z = (Math.random() - 0.5) * 8;

    const basePosition = new THREE.Vector3(x, y, z);
    const currentPosition = basePosition.clone();

    // Group containing solid box, wireframe neon border, and glowing inner status sphere
    const nodeGroup = new THREE.Group();
    nodeGroup.position.copy(basePosition);

    // Solid dark translucent box body
    const boxMat = new THREE.MeshStandardMaterial({
      color: 0x080f1d,
      roughness: 0.25,
      metalness: 0.8,
      transparent: true,
      opacity: 0.88,
    });
    const boxMesh = new THREE.Mesh(boxGeo, boxMat);
    boxMesh.userData = { nodeIndex: i, tier };
    nodeGroup.add(boxMesh);
    raycastMeshes.push(boxMesh);

    // Bright neon wireframe outline
    const wireframeMat = new THREE.LineBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.85,
    });
    const wireframeLines = new THREE.LineSegments(edgesGeo, wireframeMat);
    nodeGroup.add(wireframeLines);

    // Glowing inner telemetry core
    const coreMat = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.9,
    });
    const coreMesh = new THREE.Mesh(sphereGeo, coreMat);
    nodeGroup.add(coreMesh);

    scene.add(nodeGroup);

    serverNodes.push({
      meshGroup: nodeGroup,
      basePosition,
      currentPosition,
      baseScale: 1.0,
      targetScale: 1.0,
      tier,
      color,
      wireframeLines,
      boxMesh,
    });
  }

  // 4. Central Architecture Core Lattice (representing high-availability orchestrator)
  const coreHubGroup = new THREE.Group();
  const hubGeo = new THREE.IcosahedronGeometry(2.4, 0);
  const hubEdgesGeo = new THREE.EdgesGeometry(hubGeo);
  const hubMat = new THREE.MeshStandardMaterial({
    color: 0x050c18,
    roughness: 0.2,
    metalness: 0.9,
    transparent: true,
    opacity: 0.75,
  });
  const hubMesh = new THREE.Mesh(hubGeo, hubMat);
  const hubWireMat = new THREE.LineBasicMaterial({
    color: 0x00f5d4,
    transparent: true,
    opacity: 0.9,
  });
  const hubWire = new THREE.LineSegments(hubEdgesGeo, hubWireMat);
  coreHubGroup.add(hubMesh);
  coreHubGroup.add(hubWire);
  coreHubGroup.position.set(0, 0, -2);
  scene.add(coreHubGroup);

  // 5. Connective Network Conduits & Data Pulses
  const conduits: TelemetryConduit[] = [];
  const conduitLinesPositions: number[] = [];
  const conduitLinesColors: number[] = [];

  for (let i = 0; i < serverNodes.length; i++) {
    const nodeA = serverNodes[i];
    if (!nodeA) continue;

    for (let j = i + 1; j < serverNodes.length; j++) {
      const nodeB = serverNodes[j];
      if (!nodeB) continue;

      if (Math.abs(nodeA.tier - nodeB.tier) <= 1) {
        const dist = nodeA.basePosition.distanceTo(nodeB.basePosition);
        if (dist < (isMobile ? 7.5 : 8.5)) {
          conduitLinesPositions.push(
            nodeA.basePosition.x,
            nodeA.basePosition.y,
            nodeA.basePosition.z,
            nodeB.basePosition.x,
            nodeB.basePosition.y,
            nodeB.basePosition.z
          );

          conduitLinesColors.push(
            nodeA.color.r * 0.45,
            nodeA.color.g * 0.45,
            nodeA.color.b * 0.45,
            nodeB.color.r * 0.45,
            nodeB.color.g * 0.45,
            nodeB.color.b * 0.45
          );

          // Add moving data pulse on active conduits
          if (conduits.length < (isMobile ? 6 : 14)) {
            const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
            scene.add(pulseMesh);
            conduits.push({
              startNode: nodeA,
              endNode: nodeB,
              pulseProgress: Math.random(),
              pulseSpeed: 0.2 + Math.random() * 0.25,
              pulseMesh,
            });
          }
        }
      }
    }
  }

  const conduitGeo = new THREE.BufferGeometry();
  conduitGeo.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(conduitLinesPositions, 3)
  );
  conduitGeo.setAttribute(
    'color',
    new THREE.Float32BufferAttribute(conduitLinesColors, 3)
  );

  const conduitMat = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.35,
    depthWrite: false,
  });

  const conduitSegments = new THREE.LineSegments(conduitGeo, conduitMat);
  scene.add(conduitSegments);

  // 6. Interaction, Raycasting & Scroll State
  const raycaster = new THREE.Raycaster();
  const pointerVec = new THREE.Vector2(-999, -999);
  let targetPointerX = 0;
  let targetPointerY = 0;
  let currentRotX = 0;
  let currentRotY = 0;
  let targetScrollProgress = 0;
  let currentScrollProgress = 0;
  let isPaused = false;
  let animationFrameId: number | null = null;
  let lastTime = typeof performance !== 'undefined' ? performance.now() : 0;
  let hoveredNodeIndex: number | null = null;

  function handleRaycast() {
    if (isMobile || isReducedMotion) return;
    raycaster.setFromCamera(pointerVec, camera);
    const intersects = raycaster.intersectObjects(raycastMeshes);

    if (intersects.length > 0 && intersects[0]?.object) {
      const intersectedMesh = intersects[0].object as THREE.Mesh;
      const idx = intersectedMesh.userData['nodeIndex'] as number;
      if (typeof idx === 'number' && serverNodes[idx]) {
        hoveredNodeIndex = idx;
        serverNodes[idx].targetScale = 1.25;
        (serverNodes[idx].wireframeLines.material as THREE.LineBasicMaterial).opacity = 1.0;
      }
    } else {
      if (hoveredNodeIndex !== null && serverNodes[hoveredNodeIndex]) {
        serverNodes[hoveredNodeIndex].targetScale = 1.0;
        (serverNodes[hoveredNodeIndex].wireframeLines.material as THREE.LineBasicMaterial).opacity = 0.85;
        hoveredNodeIndex = null;
      }
    }
  }

  function renderFrame(now: number) {
    if (isPaused) return;

    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    if (!isReducedMotion) {
      // 1. Mouse pointer parallax rotation (clamped to +/- 0.08 rad)
      currentRotX += (targetPointerY * 0.08 - currentRotX) * 0.05;
      currentRotY += (targetPointerX * 0.09 - currentRotY) * 0.05;

      // 2. Smooth scroll-driven camera translation & exploded architecture
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.08;
      camera.position.z = 32 - currentScrollProgress * 12; // Camera travels forward on scroll

      // Nodes explode outward along their position vectors as user scrolls
      const dispersalFactor = 1.0 + currentScrollProgress * 1.5;
      serverNodes.forEach((node) => {
        node.meshGroup.position.x = node.basePosition.x * dispersalFactor;
        node.meshGroup.position.y = node.basePosition.y * dispersalFactor;
        node.meshGroup.position.z = node.basePosition.z * dispersalFactor;

        // Smooth scale lerping for hover feedback
        const currentScale = node.meshGroup.scale.x;
        const newScale = currentScale + (node.targetScale - currentScale) * 0.15;
        node.meshGroup.scale.set(newScale, newScale, newScale);
      });

      // 3. Central hub subtle rotation
      coreHubGroup.rotation.x += 0.003;
      coreHubGroup.rotation.y += 0.005;

      // 4. Update live telemetry pulses
      conduits.forEach((conduit) => {
        conduit.pulseProgress += conduit.pulseSpeed * dt;
        if (conduit.pulseProgress >= 1.0) {
          conduit.pulseProgress = 0;
        }

        const startPos = conduit.startNode.meshGroup.position;
        const endPos = conduit.endNode.meshGroup.position;

        conduit.pulseMesh.position.lerpVectors(
          startPos,
          endPos,
          conduit.pulseProgress
        );
      });

      // 5. Ambient group drift
      scene.rotation.x = currentRotX + Math.sin(now * 0.0004) * 0.02;
      scene.rotation.y = currentRotY + Math.cos(now * 0.0003) * 0.025;

      handleRaycast();
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

  return {
    domElement: canvas,

    setPointer(x: number, y: number) {
      targetPointerX = Math.max(-1, Math.min(1, x));
      targetPointerY = Math.max(-1, Math.min(1, y));
      pointerVec.x = targetPointerX;
      pointerVec.y = targetPointerY;
    },

    setScrollProgress(progress: number) {
      targetScrollProgress = Math.max(0, Math.min(1, progress));
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

      // Dispose shared geometries
      boxGeo.dispose();
      edgesGeo.dispose();
      sphereGeo.dispose();
      pulseGeo.dispose();
      hubGeo.dispose();
      hubEdgesGeo.dispose();
      conduitGeo.dispose();

      // Dispose materials
      pulseMat.dispose();
      hubMat.dispose();
      hubWireMat.dispose();
      conduitMat.dispose();

      serverNodes.forEach((node) => {
        (node.boxMesh.material as THREE.Material).dispose();
        (node.wireframeLines.material as THREE.Material).dispose();
      });

      // Detach canvas
      if (canvas.parentElement) {
        canvas.parentElement.removeChild(canvas);
      }

      renderer.dispose();
      if (typeof renderer.forceContextLoss === 'function') {
        renderer.forceContextLoss();
      }
    },
  };
}
