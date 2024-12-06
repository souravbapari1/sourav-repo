import { useState, useEffect, useRef } from "react";

const useIntersection = <T extends HTMLElement>(
  options?: IntersectionObserverInit
): [boolean, React.RefObject<T>] => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options]);

  return [isVisible, ref];
};

export default useIntersection;
