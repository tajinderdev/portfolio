import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTopologyScene } from './createTopologyScene';

// Mock WebGLRenderer to allow headless testing in jsdom
vi.mock('three', async () => {
  const actual = await vi.importActual<typeof import('three')>('three');

  class MockWebGLRenderer {
    domElement: HTMLCanvasElement;
    constructor(parameters?: { canvas?: HTMLCanvasElement }) {
      this.domElement = parameters?.canvas || document.createElement('canvas');
    }
    setSize = vi.fn();
    setPixelRatio = vi.fn();
    setClearColor = vi.fn();
    render = vi.fn();
    dispose = vi.fn();
    forceContextLoss = vi.fn();
  }

  return {
    ...actual,
    WebGLRenderer: MockWebGLRenderer,
  };
});

describe('createTopologyScene', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    vi.restoreAllMocks();
    container = document.createElement('div');
    Object.defineProperty(container, 'clientWidth', { value: 1000, configurable: true });
    Object.defineProperty(container, 'clientHeight', { value: 600, configurable: true });
    document.body.appendChild(container);
  });

  it('attaches a canvas to the container and returns controller methods', () => {
    const controller = createTopologyScene(container);

    expect(controller).toBeDefined();
    expect(controller.domElement).toBeInstanceOf(HTMLCanvasElement);
    expect(container.contains(controller.domElement)).toBe(true);
    expect(typeof controller.pause).toBe('function');
    expect(typeof controller.resume).toBe('function');
    expect(typeof controller.setPointer).toBe('function');
    expect(typeof controller.resize).toBe('function');
    expect(typeof controller.dispose).toBe('function');

    controller.dispose();
  });

  it('handles resize updates properly', () => {
    const controller = createTopologyScene(container);

    expect(() => {
      controller.resize(1200, 800);
    }).not.toThrow();

    controller.dispose();
  });

  it('handles pointer parallax coordinates update', () => {
    const controller = createTopologyScene(container);

    expect(() => {
      controller.setPointer(0.5, -0.3);
    }).not.toThrow();

    controller.dispose();
  });

  it('supports pause and resume lifecycles without error', () => {
    const controller = createTopologyScene(container);

    expect(() => {
      controller.pause();
      controller.resume();
      controller.pause();
    }).not.toThrow();

    controller.dispose();
  });

  it('cleans up geometries, materials, and canvas on dispose', () => {
    const controller = createTopologyScene(container);
    expect(container.contains(controller.domElement)).toBe(true);

    controller.dispose();

    expect(container.contains(controller.domElement)).toBe(false);
  });

  it('supports reduced motion mode without crashing', () => {
    const controller = createTopologyScene(container, { isReducedMotion: true });

    expect(controller).toBeDefined();
    expect(() => {
      controller.resume();
    }).not.toThrow();

    controller.dispose();
  });
});
