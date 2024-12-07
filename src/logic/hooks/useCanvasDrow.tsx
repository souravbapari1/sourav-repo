import { useRef, useState, useEffect } from "react";

interface UseCanvas {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  clearCanvas: () => void;
  setBrushColor: (color: string) => void;
  setBrushSize: (size: number) => void;
  getCanvasImage: () => File | null;
}

const useCanvas = (): UseCanvas => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColorState] = useState("#000000");
  const [brushSize, setBrushSizeState] = useState(1);

  const setBrushColor = (color: string) => setBrushColorState(color);
  const setBrushSize = (size: number) => setBrushSizeState(size);

  const startDrawing = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.beginPath();
        const { offsetX, offsetY } = getEventCoordinates(e, canvas);
        context.moveTo(offsetX, offsetY);
        context.strokeStyle = brushColor;
        context.lineWidth = brushSize;
        context.lineCap = "round";
        setIsDrawing(true);
      }
    }
  };

  const draw = (e: MouseEvent | TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        const { offsetX, offsetY } = getEventCoordinates(e, canvas);
        context.lineTo(offsetX, offsetY);
        context.stroke();
      }
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.closePath();
      }
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const getCanvasImage = (): File | null => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL("image/png");
      const byteString = atob(dataUrl.split(",")[1]);
      const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uintArray = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([arrayBuffer], { type: mimeString });
      return new File([blob], "canvas-image.png", { type: "image/png" });
    }
    return null;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleStart = (e: MouseEvent | TouchEvent) => startDrawing(e);
    const handleMove = (e: MouseEvent | TouchEvent) => draw(e);
    const handleEnd = () => stopDrawing();

    canvas.addEventListener("mousedown", handleStart);
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseup", handleEnd);
    canvas.addEventListener("mouseleave", handleEnd);

    // For touch devices
    canvas.addEventListener("touchstart", handleStart);
    canvas.addEventListener("touchmove", handleMove);
    canvas.addEventListener("touchend", handleEnd);

    return () => {
      canvas.removeEventListener("mousedown", handleStart);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseup", handleEnd);
      canvas.removeEventListener("mouseleave", handleEnd);

      canvas.removeEventListener("touchstart", handleStart);
      canvas.removeEventListener("touchmove", handleMove);
      canvas.removeEventListener("touchend", handleEnd);
    };
  }, [isDrawing, brushColor, brushSize]);

  const getEventCoordinates = (
    e: MouseEvent | TouchEvent,
    canvas: HTMLCanvasElement
  ) => {
    if (e instanceof MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      return { offsetX: e.clientX - rect.left, offsetY: e.clientY - rect.top };
    } else {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      return {
        offsetX: touch.clientX - rect.left,
        offsetY: touch.clientY - rect.top,
      };
    }
  };

  return {
    canvasRef,
    clearCanvas,
    setBrushColor,
    setBrushSize,
    getCanvasImage,
  };
};

export default useCanvas;
