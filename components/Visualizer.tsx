
import React, { useEffect, useRef } from 'react';

interface VisualizerProps {
  audioElement: HTMLAudioElement | null;
  isPlaying: boolean;
}

const Visualizer: React.FC<VisualizerProps> = ({ audioElement, isPlaying }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Add initial value to useRef to avoid "Expected 1 arguments" error
  const animationRef = useRef<number | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    if (!audioElement || !canvasRef.current) return;

    // Use a temporary variable to handle potential AudioContext constructor differences
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const audioCtx = new AudioContextClass();
    const analyzer = audioCtx.createAnalyser();
    const source = audioCtx.createMediaElementSource(audioElement);
    
    source.connect(analyzer);
    analyzer.connect(audioCtx.destination);
    
    analyzer.fftSize = 256;
    analyzerRef.current = analyzer;

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyzer.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;
        
        // Gradient color based on frequency
        const r = 0 + (i * 2);
        const g = 151;
        const b = 57;

        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    if (isPlaying) {
      draw();
    }

    return () => {
      // Clean up animation frame and audio resources
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      source.disconnect();
      audioCtx.close();
    };
  }, [audioElement, isPlaying]);

  return (
    <div className="w-full h-12 overflow-hidden rounded-lg bg-black/40">
      <canvas ref={canvasRef} width={400} height={48} className="w-full h-full opacity-60" />
    </div>
  );
};

export default Visualizer;
