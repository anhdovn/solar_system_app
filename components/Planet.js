import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'expo-three';
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
const vertexShader = `
varying vec3 vNormal;
void main() {
  vNormal = normalize( normalMatrix * normal );
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 0.9 );
}
`;
const fragmentShader = `
varying vec3 vNormal;
uniform vec3 colorA;
uniform vec3 colorB;
uniform float time;
void main() {
  vec3 color = vec3(0.0);
  float pct = abs(sin(time));
  color = mix(colorA, colorB, pct);
  float intensity = pow( 0.4 - dot( vNormal, vec3( 0, 0, 0.8 ) ), 2.0 );
  gl_FragColor = vec4( color , 1.0 ) * intensity;
}
`;

const Planet = () => {
  const atmosphere = useRef();
  const map = useLoader(TextureLoader, require('../assets/textures/2k_earth_daymap.jpg'));

  const uniform = useMemo(
    () => ({
      colorA: {
        value: new THREE.Color(0.142, 0.545, 0.995),
      },
      colorB: {
        value: new THREE.Color(0.106, 0.395, 0.995),
      },
      time: {
        value: 0,
      },
    }),
    []
  );
  console.log(uniform);
  useFrame((state, delta) => {
    atmosphere.current.time += delta;
  });
  return (
    <group>
      <mesh>
        <sphereGeometry />
        <meshStandardMaterial map={map} />
      </mesh>
      <mesh scale={1.2}>
        <sphereGeometry />
        <shaderMaterial
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          ref={atmosphere}
          side={THREE.BackSide}
          transparent
          blending={THREE.AdditiveBlending}
          toneMapped={true}
          depthWrite={false}
          uniforms={uniform}
        />
      </mesh>
    </group>
  );
};

export default Planet;
