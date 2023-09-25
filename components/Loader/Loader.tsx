"use client";
import { Html, useProgress } from "@react-three/drei";
import { animate } from "framer-motion";

export default function Loader() {
  const { progress, loaded } = useProgress();
  const [Opacity, setOpacity] = useState<string>("opacity-0");
  const [percentage, setpercentage] = useState(0);
  const [Progress, setProgress] = useState(0);
  const [From, setFrom] = useState(0);
  useEffect(() => {
    setOpacity("opacity-100");
  }, []);

  useEffect(() => {
    console.log("progress, loaded::", progress, loaded);
    const value = ((loaded / 10) * 100).toFixed(0) as unknown as number;
    setpercentage(value > 100 ? 100 : value);
  }, [progress, loaded]);

  useEffect(() => {
    animate(From, percentage, {
      type: "spring",
      bounce: 0.4,
      duration: 0.7,
      onUpdate: (latest: number) => setProgress(latest),
      onComplete: () => setFrom(percentage),
    });
  }, [percentage]);

  return (
    <Html
      //   zIndexRange={[-10, 0]}
      center
      className={`${Opacity} pointer-events-none flex h-20 min-h-fit w-full flex-col items-center justify-center gap-y-1 text-sm font-thin transition-all duration-300`}
    >
      <div className="text-stone-50 flex animate-pulse-slow2 flex-row gap-x-1">
        {Progress}% <span className="font-extralight">Loading</span>
      </div>
      <progress value={Progress} max="100" className="h-1 w-32" />
    </Html>
  );
}
import React, { useEffect, useState } from "react";
