"use client";
import {
  AccumulativeShadows,
  ContactShadows,
  OrbitControls,
  RandomizedLight,
} from "@react-three/drei";
import React, { useRef } from "react";
import Lights from "./Lights";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { selectTShirtColor } from "@/lib/slices/targetSlice";
import { useAppSelector } from "@/lib/store/hooks";

type Props = {};

export default function Environment({}: Props) {
  const color = useAppSelector(selectTShirtColor);

  const orbitRef = useRef<any>(null);
  return (
    <>
      <Lights />
      <OrbitControls
        ref={orbitRef}
        enablePan={false}
        enableDamping
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        maxAzimuthAngle={Math.PI / 2}
      />
      <ContactShadows
        position={[0, -0.41, 0]}
        opacity={0.25}
        scale={1}
        blur={2.5}
        color={color}
        far={1}
      />
      {/* <Backdrop /> */}
    </>
  );
}

function Backdrop() {
  const color = useAppSelector(selectTShirtColor);

  const shadows = useRef<any>();
  useFrame((state, delta) =>
    easing.dampC(shadows.current.getMesh().material.color, color, 0.25, delta)
  );
  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={1}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={4}
        radius={1}
        intensity={0.55}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={1}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
}
