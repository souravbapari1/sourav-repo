import { useState, useRef, useEffect } from "react";

interface DragPosition {
  x: number;
  y: number;
}

const useDrag = <T extends HTMLElement>(): [
  DragPosition,
  React.RefObject<T>
] => {
  const [position, setPosition] = useState<DragPosition>({ x: 0, y: 0 });
  const ref = useRef<T>(null);

  const handleMouseDown = (event: React.MouseEvent) => {
    const startX = event.clientX - position.x;
    const startY = event.clientY - position.y;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      setPosition({
        x: moveEvent.clientX - startX,
        y: moveEvent.clientY - startY,
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    const element = ref.current;
    element?.addEventListener("mousedown", handleMouseDown as any);

    return () => {
      element?.removeEventListener("mousedown", handleMouseDown as any);
    };
  }, [position]);

  return [position, ref];
};

export default useDrag;
