import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

export const CustomShaderMaterial = {
  uniforms: {
    color: { value: new THREE.Color(0xffffff) },
    metalness: { value: 0.47 },
    roughness: { value: 1 },
    normalScale: { value: new THREE.Vector2(1, 1) },
    map: { value: new THREE.Texture() },
    metalnessMap: { value: new THREE.Texture() },
    normalMap: { value: new THREE.Texture() },
  },
  vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
  
      void main() {
        vUv = uv;
        vNormal = normal;
  
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
  fragmentShader: `
    varying vec2 vUv;
    uniform vec3 color;
    uniform float metalness;
    uniform float roughness;
    uniform vec2 normalScale;
    uniform sampler2D map;
    uniform sampler2D metalnessMap;
    uniform sampler2D normalMap;
  
    void main() {
      vec4 diffuseColor = texture2D(map, vUv) * vec4(color, 1.0);
      float metalnessValue = texture2D(metalnessMap, vUv).r * metalness;
      vec3 metalnessColor = mix(vec3(0.04), vec3(1.0), metalnessValue);
      
      vec3 baseColor = diffuseColor.rgb * (1.0 - metalness) + metalnessColor * metalness;
      float roughnessFactor = texture2D(map, vUv).g * roughness;
      
      vec3 normal = normalize(texture2D(normalMap, vUv).xyz * 2.0 - 1.0);
      normal.xy *= normalScale;
      
      vec3 reflectedLight = normalize(reflect(-normalize(vUv - 0.5), normal));
      float roughnessSq = roughnessFactor * roughnessFactor;
      float f0 = 0.04;
      vec3 specular = specularReflection(reflectedLight, normalize(normal), f0);
      vec3 specularColor = specular * metalnessColor;
  
      vec3 finalColor = baseColor * diffuseBRDF(diffuseColor.rgb) + specularColor;
  
      gl_FragColor = vec4(finalColor, diffuseColor.a);
    }
  
    vec3 specularReflection(vec3 reflectedLight, vec3 normal, float f0) {
      float roughnessSq = roughness * roughness;
      return specularReflectionGGX(reflectedLight, normal, f0, roughnessSq);
    }
  
    vec3 specularReflectionGGX(vec3 reflectedLight, vec3 normal, float f0, float roughnessSq) {
      float roughnessSqRecip = 1.0 / roughnessSq;
      float dotNL = max(dot(normal, reflectedLight), 0.0);
      float dotNV = max(dot(normal, -normalize(vUv - 0.5)), 0.0);
  
      vec3 specular = vec3(0.0);
      if (dotNL > 0.0 && dotNV > 0.0) {
        float alpha = roughnessSq;
        float alphaRecip = 1.0 / alpha;
  
        float D = D_GGX(alpha, dotNL);
        float G = G_Smith(alphaRecip, dotNL, dotNV);
        vec3 F = F_Schlick(f0, dotNL);
  
        specular = (D * G * F) / max(4.0 * dotNL * dotNV, 0.001);
      }
  
      return specular;
    }
  
    float D_GGX(float alpha, float dotNH) {
      float alphaSq = alpha * alpha;
      float denom = dotNH * dotNH * (alphaSq - 1.0) + 1.0;
      return alphaSq / (3.14159265359 * denom * denom);
    }
  
    float G_Smith(float alpha, float dotNL, float dotNV) {
      float a = alpha * alpha;
      float GL = dotNL + sqrt(dotNL * (dotNL - dotNL * a) + a);
      float GV = dotNV + sqrt(dotNV * (dotNV - dotNV * a) + a);
      return 1.0 / (GL * GV);
    }
  
    vec3 F_Schlick(float f0, float dotLH) {
      return f0 + (1.0 - f0) * pow(1.0 - dotLH, 5.0);
    }
  
    vec3 diffuseBRDF(vec3 diffuseColor) {
      return PI_INV * diffuseColor;
    }
  
    const float PI_INV = 1.0 / 3.14159265359;
  
  
    `,
};
