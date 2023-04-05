import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'expo-three';
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { log } from '../App';
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

const Planet = ({ name, scale, texture, colorA, colorB, ring, ...props }) => {
  const atmosphere = useRef();
  const planet = useRef();
  const planetCore = useRef();
  const map = new TextureLoader().load(texture);
  const uniform = useMemo(
    () => ({
      colorA: {
        value: colorA,
      },
      colorB: {
        value: colorB,
      },
      time: {
        value: 0,
      },
    }),
    []
  );
  useFrame((state, delta) => {
    atmosphere.current.time += delta;
  });
  return (
    <group
      {...props}
      scale={scale}
      ref={planet}
      name={name}
      // onClick={onPlanetCoreClick}
      // onPointerEnter={onPointerEnter}
      // onPointerLeave={onPointerLeave}
    >
      <group ref={planetCore}>
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
    </group>
  );
};

export default Planet;
