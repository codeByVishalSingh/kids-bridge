"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type ShaderBgProps = {
  variant: "aurora" | "plasma" | "wave";
  height?: string;
  opacity?: number;
  children?: React.ReactNode;
  className?: string;
};

export default function ShaderBackground({
  variant,
  height = "400px",
  opacity = 1,
  children,
  className,
}: ShaderBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    let fsSource = "";

    const commonSetup = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      
      vec3 navy = vec3(0.047, 0.110, 0.251);  // #0C1C40
      vec3 teal = vec3(0.059, 0.533, 0.490);  // #0F887D
      vec3 gold = vec3(0.937, 0.718, 0.259);  // #EFB742
    `;

    if (variant === "aurora") {
      fsSource = `
        ${commonSetup}
        void main() {
          vec2 st = gl_FragCoord.xy / u_resolution.xy;
          float y = sin(st.x * 5.0 + u_time) * 0.1 + sin(st.x * 2.0 - u_time * 0.5) * 0.2 + 0.5;
          float dist = abs(st.y - y);
          
          vec3 color = mix(navy, teal, smoothstep(0.5, 0.0, dist));
          color = mix(color, gold, smoothstep(0.2, 0.0, dist) * 0.5);
          
          gl_FragColor = vec4(color, 1.0);
        }
      `;
    } else if (variant === "plasma") {
      fsSource = `
        ${commonSetup}
        void main() {
          vec2 st = gl_FragCoord.xy / u_resolution.xy;
          st -= 0.5;
          st.x *= u_resolution.x / u_resolution.y;
          
          float d = length(st);
          float t = u_time * 0.5;
          
          float v = sin(d * 10.0 - t * 4.0) * 0.5 + 0.5;
          v += sin(st.x * 5.0 + t) * 0.5;
          v += sin(st.y * 5.0 - t) * 0.5;
          v /= 3.0;
          
          vec3 color = mix(navy, mix(teal, gold, v), v);
          gl_FragColor = vec4(color, 1.0);
        }
      `;
    } else if (variant === "wave") {
      fsSource = `
        ${commonSetup}
        void main() {
          vec2 st = gl_FragCoord.xy / u_resolution.xy;
          float wave = sin(st.x * 10.0 + u_time) * 0.1 + 0.5;
          
          vec3 color = mix(navy, teal, smoothstep(0.5, 0.0, abs(st.y - wave)));
          gl_FragColor = vec4(color, 1.0);
        }
      `;
    }

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const program = gl.createProgram();
    if (!program || !vertexShader || !fragmentShader) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");

    let animationId: number;
    let startTime = Date.now();

    const render = () => {
      gl.useProgram(program);

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth * dpr;
      const height = canvas.clientHeight * dpr;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      gl.uniform2f(resolutionLocation, width, height);
      gl.uniform1f(timeLocation, (Date.now() - startTime) * 0.001);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [variant]);

  return (
    <div className={cn("relative w-full overflow-hidden", className)} style={{ height }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ opacity }}
      />
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
