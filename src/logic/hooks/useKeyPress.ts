import { useState, useEffect } from "react";

// Define a union type for common key names
type KeyName =
  | "Enter"
  | "Tab"
  | "Backspace"
  | "Shift"
  | "Control"
  | "Alt"
  | "Meta"
  | "ArrowUp"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "Escape"
  | " " // Spacebar
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9";

interface UseKeyPressEffectProps {
  onPressed: (e: KeyboardEvent) => void;
  keys: KeyName[];
  dependencies?: any[];
}

export function useKeyPressEffect({
  onPressed,
  keys,
  dependencies = [],
}: UseKeyPressEffectProps) {
  // Track the state of pressed keys
  const keysPressed = new Set<string>();

  // Function to reset the combo and keysPressed state
  const resetCombo = () => {
    keysPressed.clear();
  };

  // Function to check if all keys in the combo are pressed
  const checkCombo = (e: KeyboardEvent) => {
    const allKeysPressed = keys.every((key) =>
      keysPressed.has(key.toLowerCase())
    );

    if (allKeysPressed) {
      e.preventDefault();
      onPressed(e);
      resetCombo();
    }
  };

  // Handlers for key down and key up events
  const downHandler = (e: KeyboardEvent) => {
    keysPressed.add(e.key.toLowerCase());
    checkCombo(e);
  };

  const upHandler = (e: KeyboardEvent) => {
    keysPressed.delete(e.key.toLowerCase());
    checkCombo(e);
  };

  // Effect hook for setting up event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    // Cleanup event listeners on unmount or when the dependencies change
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [keys, ...dependencies]);
}
