"use client";
import { selectTShirtColor } from "@/lib/slices/targetSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { Environment, useHelper } from "@react-three/drei";
import React, { useRef } from "react";
import { SpotLight, SpotLightHelper } from "three";

type Props = {};

export default function Lights({}: Props) {
  const color = useAppSelector(selectTShirtColor);

  return (
    <>
      <ambientLight intensity={1} />
      <Environment preset="studio" />
      <pointLight
        position={[0.1, 0.2, 1]}
        intensity={1}
        color={color === "#000" ? "white" : color}
      />
    </>
  );
}
