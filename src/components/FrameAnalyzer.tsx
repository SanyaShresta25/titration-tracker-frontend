import { useEffect, useRef, useState } from "react";

const FrameAnalyzer = ({
  video,
  setSmiles,
  setProgress,
}: {
  video: HTMLVideoElement;
  setSmiles: React.Dispatch<React.SetStateAction<string>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [message, setMessage] = useState("Waiting...");

  const isPink = (r: number, g: number, b: number) =>
    r > 180 && g < 120 && b > 180 && r > b && r > g * 1.5;

  useEffect(() => {
    if (!video) return;

    const interval = setInterval(() => {
      if (!canvasRef.current) return;

      const ctx = canvasRef.current.getContext("2d");
      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;
      ctx?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      const imgData = ctx?.getImageData(0, 0, video.videoWidth, video.videoHeight).data;
      if (!imgData) return;

      let pinkPixels = 0;
      for (let i = 0; i < imgData.length; i += 4) {
        const r = imgData[i];
        const g = imgData[i + 1];
        const b = imgData[i + 2];
        if (isPink(r, g, b)) pinkPixels++;
      }

      const duration = video.duration || 1;
      const currentTime = video.currentTime;
      const progressPercent = Math.min((currentTime / duration) * 100, 100);
      setProgress(Math.round(progressPercent));

      if (currentTime < duration * 0.33) {
        setMessage("Initial: HCl + Phenolphthalein (Colorless)");
        setSmiles("C20H14O4"); // Neutral phenolphthalein
      } else if (currentTime < duration * 0.66) {
        setMessage("NaOH being added – Pink appears");
        setSmiles("C1=CC=C(C=C1)C(C(=O)O)=C(C2=CC=CC=C2)O"); // Pink phenolphthalein
      } else {
        setMessage("End: Salt (NaCl) formed – Reaction Complete");
        setSmiles("Cl[Na]"); // Sodium chloride
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [video, setSmiles, setProgress]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">{message}</h2>
      <canvas ref={canvasRef} className="hidden" width={1} height={1} />
    </div>
  );
};

export default FrameAnalyzer;
