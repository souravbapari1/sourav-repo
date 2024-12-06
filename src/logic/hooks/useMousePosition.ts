import { useState, useEffect, useRef } from "react";

interface MousePosition {
  x: number;
  y: number;
}

const useMousePosition = <T extends HTMLElement>(): [
  MousePosition,
  React.RefObject<T>
] => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent): void => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    };

    const currentElement = ref.current;

    if (currentElement) {
      currentElement.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (currentElement) {
        currentElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return [mousePosition, ref];
};

export default useMousePosition;
