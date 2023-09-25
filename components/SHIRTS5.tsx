"use client";
import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { Decal, PivotControls, useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { selectDesign, selectTShirtColor } from "@/lib/slices/targetSlice";
import { useAppSelector } from "@/lib/store/hooks";
import gsap, { Power3, Power4 } from "gsap";
import { CustomShaderMaterial } from "@/utils/customShader";
import { extend } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    ["High_Neck_T-shirt001"]: THREE.Mesh;
    ["High_Neck_T-shirt001_1"]: THREE.Mesh;
    ["High_Neck_T-shirt001_2"]: THREE.Mesh;
    ["High_Neck_T-shirt001_3"]: THREE.Mesh;
    ["High_Neck_T-shirt001_4"]: THREE.Mesh;
    ["High_Neck_T-shirt001_5"]: THREE.Mesh;
  };
  materials: {
    ["TShirt Body"]: THREE.MeshStandardMaterial;
    Strings: THREE.MeshStandardMaterial;
    ["Bellow Strings"]: THREE.MeshStandardMaterial;
    ["Neck Middle"]: THREE.MeshStandardMaterial;
    ["Bottom Hem"]: THREE.MeshStandardMaterial;
    Neck: THREE.MeshStandardMaterial;
  };
};

export function Shirt(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const decal = useRef<{ position: { x: number; y: number; z: number } }>({
    position: { x: 0, y: 0.2, z: 0.1 },
  });
  const [reset, setreset] = useState(true);
  const color = useAppSelector(selectTShirtColor);
  const design = useAppSelector(selectDesign);
  const { nodes, materials } = useGLTF("/SHIRTS4.gltf") as GLTFResult;
  useEffect(() => {
    if (group.current) {
      gsap.to(group.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        ease: Power3.easeOut,
        duration: 1.2,
      });
      if (reset) setreset(false);
      else setreset(true);
    }
  }, []);

  useEffect(() => {
    const rgb = new THREE.Color(color);
    if (group.current) {
      gsap.to(group.current.rotation, {
        y: reset ? -Math.PI * 2 - Math.PI / 10 : -Math.PI / 10,
        ease: Power3.easeOut,
        duration: 1.2,
      });
      if (reset) setreset(false);
      else setreset(true);
    }
    gsap.to(materials["TShirt Body"].color, {
      r: rgb.r,
      g: rgb.g,
      b: rgb.b,
      ease: Power4.easeOut,
      duration: 0.8,
    });
  }, [color]);
  extend({ CustomShaderMaterial });

  const [pos, setXYZ] = useState([0, 0, 0.1]);
  const [rot, setRot] = useState([0, 0, 0]);
  const [first, second, third, fourth] = useTexture([
    "/textures/1.png",
    "/textures/2.png",
    "/textures/3.png",
    "/textures/4.png",
  ]);
  first.colorSpace = THREE.SRGBColorSpace;
  second.colorSpace = THREE.SRGBColorSpace;
  third.colorSpace = THREE.SRGBColorSpace;
  fourth.colorSpace = THREE.SRGBColorSpace;
  const getDesign = (i: any) => {
    switch (true) {
      case i === 1:
        return first;
      case i === 2:
        return second;
      case i === 3:
        return third;
      case i === 4:
        return fourth;
    }
  };
  return (
    <group
      ref={group}
      {...props}
      scale={[0, 0, 0]}
      rotation={[0, -Math.PI / 10, 0]}
      dispose={null}
    >
      <mesh
        castShadow
        geometry={nodes["High_Neck_T-shirt001"].geometry}
        material={materials["TShirt Body"]}
      >
        <Decal position={[0, 0.05, 0.1]} scale={[-0.2, 0.2, 0.2]}>
          <meshPhysicalMaterial
            transparent
            polygonOffset
            map={getDesign(design)}
            map-anisotropy={16}
            map-flipX={false}
            iridescence={1}
            iridescenceIOR={1}
            iridescenceThicknessRange={[0, 1400]}
            roughness={1}
            clearcoat={0.5}
            metalness={0.75}
            toneMapped={true}
          />
        </Decal>
      </mesh>
      <mesh
        castShadow
        geometry={nodes["High_Neck_T-shirt001_1"].geometry}
        material={materials.Strings}
      />
      <mesh
        castShadow
        geometry={nodes["High_Neck_T-shirt001_2"].geometry}
        material={materials["Bellow Strings"]}
      />
      <mesh
        castShadow
        geometry={nodes["High_Neck_T-shirt001_3"].geometry}
        material={materials["Neck Middle"]}
      />
      <mesh
        castShadow
        geometry={nodes["High_Neck_T-shirt001_4"].geometry}
        material={materials["Bottom Hem"]}
      />
      <mesh
        castShadow
        geometry={nodes["High_Neck_T-shirt001_5"].geometry}
        material={materials.Neck}
      />
    </group>
  );
}

useGLTF.preload("/SHIRTS4.gltf");
