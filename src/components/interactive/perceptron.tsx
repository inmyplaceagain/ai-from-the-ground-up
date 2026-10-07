"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Dataset = "and" | "or" | "xor";

const DATASETS: Record<Dataset, { points: [number, number][]; labels: number[] }> = {
  and: {
    points: [[0, 0], [0, 1], [1, 0], [1, 1]],
    labels: [0, 0, 0, 1],
  },
  or: {
    points: [[0, 0], [0, 1], [1, 0], [1, 1]],
    labels: [0, 1, 1, 1],
  },
  xor: {
    points: [[0, 0], [0, 1], [1, 0], [1, 1]],
    labels: [0, 1, 1, 0],
  },
};

export function Perceptron() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const [dataset, setDataset] = useState<Dataset>("and");
  const [w1, setW1] = useState(0.5);
  const [w2, setW2] = useState(0.5);
  const [bias, setBias] = useState(-0.7);
  const [training, setTraining] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const [converged, setConverged] = useState(false);

  const lr = 0.1;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;
    const pad = 48;
    const plotW = W - pad * 2;
    const plotH = H - pad * 2;

    const styles = getComputedStyle(document.documentElement);
    const fg = styles.getPropertyValue("--fg").trim() || "#1a1a2e";
    const fgSubtle = styles.getPropertyValue("--fg-subtle").trim() || "#8a8a9e";
    const border = styles.getPropertyValue("--border").trim() || "#e2e0dd";
    const bgRaised = styles.getPropertyValue("--bg-raised").trim() || "#f0eeeb";
    const accent = styles.getPropertyValue("--accent").trim() || "#f59e0b";
    const link = styles.getPropertyValue("--link").trim() || "#3b82f6";

    // Background
    ctx.fillStyle = bgRaised;
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = border;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const x = pad + (plotW * i) / 4;
      const y = pad + (plotH * i) / 4;
      ctx.beginPath();
      ctx.moveTo(x, pad);
      ctx.lineTo(x, pad + plotH);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(pad, y);
      ctx.lineTo(pad + plotW, y);
      ctx.stroke();
    }

    // Axis labels
    ctx.font = "11px system-ui, sans-serif";
    ctx.fillStyle = fgSubtle;
    ctx.textAlign = "center";
    for (let i = 0; i <= 4; i++) {
      const val = (i * 0.25).toFixed(2);
      const x = pad + (plotW * i) / 4;
      const y = pad + plotH - (plotH * i) / 4;
      ctx.fillText(val, x, pad + plotH + 16);
      if (i > 0) {
        ctx.textAlign = "right";
        ctx.fillText(val, pad - 8, y + 4);
        ctx.textAlign = "center";
      }
    }

    ctx.fillStyle = fgSubtle;
    ctx.font = "12px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("x₁", W / 2, H - 4);
    ctx.save();
    ctx.translate(12, H / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("x₂", 0, 0);
    ctx.restore();

    // Decision boundary: w1*x1 + w2*x2 + bias = 0
    // x2 = -(w1*x1 + bias) / w2
    if (Math.abs(w2) > 0.001) {
      const x1_start = -0.1;
      const x1_end = 1.1;
      const x2_at_start = -(w1 * x1_start + bias) / w2;
      const x2_at_end = -(w1 * x1_end + bias) / w2;

      const toCanvasX = (v: number) => pad + v * plotW;
      const toCanvasY = (v: number) => pad + plotH - v * plotH;

      // Shade the regions
      ctx.save();
      ctx.globalAlpha = 0.08;

      // Region where w1*x1 + w2*x2 + bias >= 0 (class 1)
      ctx.beginPath();
      ctx.rect(pad, pad, plotW, plotH);
      ctx.clip();

      ctx.fillStyle = link;
      ctx.beginPath();
      if (w2 > 0) {
        ctx.moveTo(toCanvasX(x1_start), toCanvasY(x2_at_start));
        ctx.lineTo(toCanvasX(x1_end), toCanvasY(x2_at_end));
        ctx.lineTo(toCanvasX(x1_end), toCanvasY(1.1));
        ctx.lineTo(toCanvasX(x1_start), toCanvasY(1.1));
      } else {
        ctx.moveTo(toCanvasX(x1_start), toCanvasY(x2_at_start));
        ctx.lineTo(toCanvasX(x1_end), toCanvasY(x2_at_end));
        ctx.lineTo(toCanvasX(x1_end), toCanvasY(-0.1));
        ctx.lineTo(toCanvasX(x1_start), toCanvasY(-0.1));
      }
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      // Decision boundary line
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2.5;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(toCanvasX(x1_start), toCanvasY(x2_at_start));
      ctx.lineTo(toCanvasX(x1_end), toCanvasY(x2_at_end));
      ctx.stroke();
    } else if (Math.abs(w1) > 0.001) {
      // Vertical line: x1 = -bias / w1
      const x1Val = -bias / w1;
      const cx = pad + x1Val * plotW;
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx, pad);
      ctx.lineTo(cx, pad + plotH);
      ctx.stroke();
    }

    // Data points
    const data = DATASETS[dataset];
    data.points.forEach(([x1, x2], i) => {
      const cx = pad + x1 * plotW;
      const cy = pad + plotH - x2 * plotH;
      const label = data.labels[i];

      // Compute prediction
      const z = w1 * x1 + w2 * x2 + bias;
      const predicted = z >= 0 ? 1 : 0;
      const correct = predicted === label;

      ctx.beginPath();
      ctx.arc(cx, cy, 10, 0, Math.PI * 2);

      if (label === 1) {
        ctx.fillStyle = link;
      } else {
        ctx.fillStyle = fgSubtle;
      }
      ctx.fill();

      // Mark incorrect predictions
      if (!correct) {
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      // Label
      ctx.fillStyle = "#fff";
      ctx.font = "bold 11px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(String(label), cx, cy + 4);
    });

    // Legend
    ctx.font = "11px system-ui, sans-serif";
    ctx.textAlign = "left";

    ctx.fillStyle = link;
    ctx.beginPath();
    ctx.arc(W - 120, pad + 8, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = fg;
    ctx.fillText("Class 1", W - 110, pad + 12);

    ctx.fillStyle = fgSubtle;
    ctx.beginPath();
    ctx.arc(W - 120, pad + 28, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = fg;
    ctx.fillText("Class 0", W - 110, pad + 32);

  }, [w1, w2, bias, dataset]);

  useEffect(() => {
    draw();
    const observer = new ResizeObserver(() => draw());
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [draw]);

  function trainStep() {
    const data = DATASETS[dataset];
    let newW1 = w1;
    let newW2 = w2;
    let newBias = bias;
    let allCorrect = true;

    for (let i = 0; i < data.points.length; i++) {
      const [x1, x2] = data.points[i];
      const expected = data.labels[i];
      const z = newW1 * x1 + newW2 * x2 + newBias;
      const predicted = z >= 0 ? 1 : 0;

      if (predicted !== expected) {
        allCorrect = false;
        const error = expected - predicted;
        newW1 += lr * error * x1;
        newW2 += lr * error * x2;
        newBias += lr * error;
      }
    }

    setW1(newW1);
    setW2(newW2);
    setBias(newBias);

    return allCorrect;
  }

  function handleTrain() {
    if (training) return;
    setTraining(true);
    setConverged(false);
    setEpoch(0);

    let currentEpoch = 0;
    let currentW1 = w1;
    let currentW2 = w2;
    let currentBias = bias;

    function step() {
      const data = DATASETS[dataset];
      let allCorrect = true;

      for (let i = 0; i < data.points.length; i++) {
        const [x1, x2] = data.points[i];
        const expected = data.labels[i];
        const z = currentW1 * x1 + currentW2 * x2 + currentBias;
        const predicted = z >= 0 ? 1 : 0;

        if (predicted !== expected) {
          allCorrect = false;
          const error = expected - predicted;
          currentW1 += lr * error * x1;
          currentW2 += lr * error * x2;
          currentBias += lr * error;
        }
      }

      currentEpoch++;
      setW1(currentW1);
      setW2(currentW2);
      setBias(currentBias);
      setEpoch(currentEpoch);

      if (allCorrect) {
        setConverged(true);
        setTraining(false);
      } else if (currentEpoch >= 100) {
        setConverged(false);
        setTraining(false);
      } else {
        animationRef.current = requestAnimationFrame(() => {
          setTimeout(step, 80);
        });
      }
    }

    step();
  }

  function handleReset() {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setTraining(false);
    setW1(Math.random() * 2 - 1);
    setW2(Math.random() * 2 - 1);
    setBias(Math.random() * 2 - 1);
    setEpoch(0);
    setConverged(false);
  }

  function handleDatasetChange(d: Dataset) {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    setDataset(d);
    setTraining(false);
    setEpoch(0);
    setConverged(false);
    setW1(Math.random() * 2 - 1);
    setW2(Math.random() * 2 - 1);
    setBias(Math.random() * 2 - 1);
  }

  return (
    <div ref={containerRef} className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {(["and", "or", "xor"] as const).map((d) => (
          <button
            key={d}
            onClick={() => handleDatasetChange(d)}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
              dataset === d
                ? "bg-accent text-white"
                : "bg-bg-inset text-fg-muted hover:text-fg"
            }`}
          >
            {d}
          </button>
        ))}
        <div className="flex-1" />
        <button
          onClick={handleTrain}
          disabled={training}
          className="rounded-md bg-link px-4 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {training ? `Training... (${epoch})` : "Train"}
        </button>
        <button
          onClick={handleReset}
          className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-fg-muted transition-colors hover:text-fg"
        >
          Reset
        </button>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full rounded-lg"
        style={{ height: 380 }}
      />

      {/* Sliders */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="font-medium text-fg-muted">w₁</span>
            <span className="font-mono text-fg-subtle">{w1.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={-2}
            max={2}
            step={0.01}
            value={w1}
            onChange={(e) => { setW1(+e.target.value); setConverged(false); }}
            className="w-full accent-accent"
          />
        </label>
        <label className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="font-medium text-fg-muted">w₂</span>
            <span className="font-mono text-fg-subtle">{w2.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={-2}
            max={2}
            step={0.01}
            value={w2}
            onChange={(e) => { setW2(+e.target.value); setConverged(false); }}
            className="w-full accent-accent"
          />
        </label>
        <label className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="font-medium text-fg-muted">bias</span>
            <span className="font-mono text-fg-subtle">{bias.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={-2}
            max={2}
            step={0.01}
            value={bias}
            onChange={(e) => { setBias(+e.target.value); setConverged(false); }}
            className="w-full accent-accent"
          />
        </label>
      </div>

      {/* Status */}
      <div className="text-center text-xs text-fg-subtle">
        {converged && dataset !== "xor" && (
          <span className="text-part-3 font-medium">
            Converged after {epoch} epochs — all points classified correctly.
          </span>
        )}
        {converged && dataset === "xor" && (
          <span className="text-part-3 font-medium">
            Converged after {epoch} epochs.
          </span>
        )}
        {!converged && !training && epoch >= 100 && dataset === "xor" && (
          <span className="text-red-500 font-medium">
            Could not converge after 100 epochs. XOR is not linearly separable — a single perceptron cannot solve it.
          </span>
        )}
        {!converged && !training && epoch === 0 && (
          <span>
            Drag the sliders to move the decision boundary, or hit Train to watch the perceptron learn.
          </span>
        )}
        {training && (
          <span>Training... epoch {epoch}</span>
        )}
        {!converged && !training && epoch > 0 && epoch < 100 && (
          <span>Paused at epoch {epoch}. Hit Train to continue.</span>
        )}
      </div>

      {/* Equation display */}
      <div className="rounded-lg bg-bg-inset px-4 py-3 text-center font-mono text-sm text-fg-muted">
        <span className="text-fg-subtle">f(x) = </span>
        <span className="text-link">{w1.toFixed(2)}</span>
        <span className="text-fg-subtle">·x₁ + </span>
        <span className="text-link">{w2.toFixed(2)}</span>
        <span className="text-fg-subtle">·x₂ + </span>
        <span className="text-accent">{bias >= 0 ? "" : ""}{bias.toFixed(2)}</span>
        <span className="text-fg-subtle"> ≥ 0 → class 1</span>
      </div>
    </div>
  );
}
