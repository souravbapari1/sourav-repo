import { useEffect } from "react";

/**
 * Runs an effect after a specified delay.
 *
 * @param effect - The effect function to run.
 * @param deps - Dependency array to control the effect.
 * @param delay - Delay in milliseconds before running the effect.
 */
function useDebouncedEffect(
  effect: () => void,
  deps: any[],
  delay: number = 300
) {
  useEffect(() => {
    const handler = setTimeout(() => {
      effect();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [...deps, delay]);
}

export default useDebouncedEffect;
