"use client";
// components/AnimatedImage.tsx
import React, { useState } from "react";
import Image from "next/image";

type AnimatedImageProps = {
  src: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
  animationType?: "fade" | "splash";
  duration?: number;
  blurDataURL?: string; // Optional base64-encoded placeholder image
  onLoadCallback?: () => void;
};

const AnimatedImage: React.FC<AnimatedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  animationType = "fade", // Options: 'fade', 'splash'
  duration = 500, // Animation duration in milliseconds
  blurDataURL,
  onLoadCallback = () => {},
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
    onLoadCallback();
  };

  const animationStyles = {
    fade: `transition-opacity ease-in duration-${duration} ${
      loaded ? "opacity-100" : "opacity-0"
    }`,
    splash: `transform transition duration-${duration} ${
      loaded ? "scale-100 opacity-100" : "scale-50 opacity-0"
    }`,
  };

  return (
    <Image
      src={src}
      alt={alt || src}
      width={width}
      height={height}
      placeholder={blurDataURL ? "blur" : undefined}
      blurDataURL={blurDataURL}
      className={`${className} ${animationStyles[animationType]}`}
      onLoadingComplete={handleImageLoad}
      {...props}
    />
  );
};

export default AnimatedImage;
