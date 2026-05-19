"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function AnimatedShaderHero() {
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

    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;

      float random (in vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float noise (in vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      #define OCTAVES 5
      float fbm (in vec2 st) {
          float value = 0.0;
          float amplitude = 0.5;
          vec2 shift = vec2(100.0);
          mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
          for (int i = 0; i < OCTAVES; i++) {
              value += amplitude * noise(st);
              st = rot * st * 2.0 + shift;
              amplitude *= 0.5;
          }
          return value;
      }

      void main() {
          vec2 st = gl_FragCoord.xy/u_resolution.xy;
          st.x *= u_resolution.x/u_resolution.y;
          
          // Mouse warp
          vec2 mouse = u_mouse / u_resolution;
          float dist = distance(st, mouse);
          st += (mouse - st) * 0.1 * smoothstep(0.5, 0.0, dist);

          vec3 navy = vec3(0.047, 0.110, 0.251);  // #0C1C40
          vec3 teal = vec3(0.059, 0.533, 0.490);  // #0F887D
          vec3 gold = vec3(0.937, 0.718, 0.259);  // #EFB742

          vec2 q = vec2(0.);
          q.x = fbm( st + 0.00 * u_time);
          q.y = fbm( st + vec2(1.0));

          vec2 r = vec2(0.);
          r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*u_time );
          r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*u_time);

          float f = fbm(st+r);

          vec3 color = mix(navy, teal, clamp((f*f)*4.0,0.0,1.0));
          color = mix(color, gold, clamp(length(q),0.0,1.0));
          color = mix(color, teal, clamp(length(r.x),0.0,1.0));
          
          gl_FragColor = vec4((f*f*f+.6*f*f+.5*f)*color,1.0);
      }
    `;

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
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = window.innerHeight - e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

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
      gl.uniform2f(mouseLocation, mouseX * dpr, mouseY * dpr);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const headline = "Connect. Source. Deliver.";

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* WebGL Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Overlay Layers */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(160deg, rgba(12,28,64,0.55) 0%, rgba(6,14,32,0.72) 60%, rgba(4,8,20,0.85) 100%)",
        }}
      />
      <div className="absolute inset-0 z-10 opacity-4 pointer-events-none">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 flex flex-col items-center text-center mt-16">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 0.8 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/35 bg-gold/5 backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-gold animate-[pulse_2s_infinite]" />
          <span className="text-gold text-sm font-medium">India's Premier Kidswear B2B Platform</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-serif text-[clamp(52px,8vw,96px)] leading-[1.1] tracking-tight text-white mb-6"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.10 },
            },
          }}
          initial="hidden"
          animate="visible"
        >
          {headline.split(" ").map((word, i) => (
            <motion.span
              key={i}
              className={`inline-block mr-3 ${word === "Source." ? "text-gold italic" : ""}`}
              variants={{
                hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)" },
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg text-white/60 max-w-[540px] mb-10"
        >
          The B2B bridge between kidswear manufacturers and wholesalers across India. Browse 12,000+ SKUs, negotiate MOQs, and fulfil orders — all in one platform.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <button className="group px-8 py-4 bg-gold text-navy font-bold rounded-full transition-all hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(239,183,66,0.4)] flex items-center justify-center gap-2">
            Browse Catalogue <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 bg-transparent border border-white/20 backdrop-blur-sm text-white font-medium rounded-full transition-all hover:bg-white/5 hover:border-white/40">
            I'm a Manufacturer
          </button>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl"
        >
          {[
            { label: "Manufacturers", value: "500+" },
            { label: "SKUs Listed", value: "12K+" },
            { label: "On-time", value: "98%" },
            { label: "Cities", value: "30+" },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md flex flex-col items-center justify-center">
              <div className="font-mono text-2xl font-bold text-gold mb-1">{stat.value}</div>
              <div className="text-xs text-white/55 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Scroll</span>
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
