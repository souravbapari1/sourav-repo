import { useState, useLayoutEffect, useRef } from "react";

interface Dimensions {
  width: number;
  height: number;
}

const useElementSize = <T extends HTMLElement>(): [
  Dimensions,
  React.RefObject<T>
] => {
  const [size, setSize] = useState<Dimensions>({ width: 0, height: 0 });
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const updateSize = () => {
      if (ref.current) {
        setSize({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
        });
      }
    };

    updateSize();

    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return [size, ref];
};

export default useElementSize;
