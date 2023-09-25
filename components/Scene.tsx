"use client";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Environment from "./Environment/Environment";
import { Shirt } from "./SHIRTS5";
import { Float, PerspectiveCamera } from "@react-three/drei";
import Loader from "./Loader/Loader";

export default function Scene({ ...props }) {
  return (
    <Canvas shadows {...props} camera={{ position: [0, 0, 5] }}>
      <Suspense fallback={<Loader />}>
        <Environment />
        {/* <Stage
        position={[0, 0, 0]}
        adjustCamera
        environment="city"
        intensity={0.6}
      > */}
        <Float floatIntensity={0.05} speed={2}>
          <Shirt position={[0, 0, 0]} />
        </Float>
        {/* </Stage> */}
        <PerspectiveCamera
          makeDefault={true}
          position={[0, 0.05, 1.6]}
          fov={30}
        />
      </Suspense>
    </Canvas>
  );
}
