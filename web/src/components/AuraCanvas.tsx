"use client";

import { useEffect, useRef } from "react";

/**
 * Soft pink light wash behind the page. Skipped on small screens and under
 * reduced-motion, where a static gradient stands in.
 */
export function AuraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const fallback = fallbackRef.current;
    if (!canvas || !fallback) return;

    const showFallback = () => {
      canvas.style.display = "none";
      fallback.classList.remove("hidden");
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    if (reduced || small) {
      showFallback();
      return;
    }

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) {
      showFallback();
      return;
    }

    const vertexSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uResolution;

      float blob(vec2 uv, vec2 p, float r) {
        return smoothstep(r, r - 0.5, length(uv - p));
      }

      void main() {
        vec2 uv = vUv;
        vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
        vec2 q = (uv - 0.5) * aspect;

        float intro = min(uTime / 6.0, 1.0);
        vec2 p1 = vec2(-0.42 + 0.05 * sin(uTime * 0.24), 0.30 + 0.03 * cos(uTime * 0.19));
        vec2 p2 = vec2(0.46 + 0.04 * cos(uTime * 0.17), -0.08 + 0.05 * sin(uTime * 0.21));
        vec2 p3 = vec2(0.04 + 0.06 * sin(uTime * 0.13), -0.46 + 0.04 * cos(uTime * 0.2));

        float a = blob(q, p1, 0.44 + 0.03 * sin(uTime * 0.27));
        float b = blob(q, p2, 0.50 + 0.02 * cos(uTime * 0.23));
        float c = blob(q, p3, 0.38 + 0.03 * sin(uTime * 0.31));

        vec3 color = vec3(0.0);
        color += a * vec3(1.0, 0.52, 0.70);
        color += b * vec3(0.95, 0.62, 0.74);
        color += c * vec3(1.0, 0.76, 0.84);

        float vignette = smoothstep(0.92, 0.10, length(uv - 0.5));
        float alpha = (a + b + c) * 0.11 * vignette * intro;
        gl_FragColor = vec4(color, alpha);
      }
    `;

    function compile(type: number, source: string) {
      const shader = gl!.createShader(type)!;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        throw new Error(String(gl!.getShaderInfoLog(shader)));
      }
      return shader;
    }

    let program: WebGLProgram;
    try {
      program = gl.createProgram()!;
      gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSource));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSource));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(String(gl.getProgramInfoLog(program)));
      }
    } catch {
      showFallback();
      return;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const position = gl.getAttribLocation(program, "position");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uResolution = gl.getUniformLocation(program, "uResolution");

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas!.width = Math.floor(window.innerWidth * dpr);
      canvas!.height = Math.floor(window.innerHeight * dpr);
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }

    window.addEventListener("resize", resize, { passive: true });
    resize();

    const start = performance.now();
    let frame = requestAnimationFrame(function render(now: number) {
      const time = (now - start) * 0.001;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.enableVertexAttribArray(position);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      gl.uniform1f(uTime, time);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frame = requestAnimationFrame(render);
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
      />
      <div
        ref={fallbackRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 hidden"
        style={{
          background:
            "radial-gradient(38rem 24rem at 15% 5%, rgba(255,133,178,0.14), transparent 70%), radial-gradient(34rem 22rem at 88% 40%, rgba(255,178,205,0.1), transparent 70%)",
        }}
      />
    </>
  );
}
