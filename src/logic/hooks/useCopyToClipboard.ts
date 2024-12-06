import { useRef } from "react";

const useCopyToClipboard = () => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const copyToClipboard = () => {
    if (ref.current) {
      ref.current.select();
      document.execCommand("copy");
    }
  };

  return [ref, copyToClipboard] as const;
};

export default useCopyToClipboard;
