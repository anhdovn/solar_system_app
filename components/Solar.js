import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef } from 'react';
import Planet from './Planet';
export const EARTH_YEAR = 1.3 * Math.PI * (1 / 60) * (1 / 60);
export const SCALE = 1.5;
export const SPACE = 3;
const Solar = (props) => {
  const solar = useRef();
  const mercury = useRef();
  const venus = useRef();
  const earth = useRef();
  const mars = useRef();
  const jupiter = useRef();
  const saturn = useRef();
  const uranus = useRef();
  const neptune = useRef();
  const pluto = useRef();
  const camera = useThree((state) => state.camera);
  const controls = useThree((state) => state.controls);
  useFrame(() => {
    earth.current.rotation.y += EARTH_YEAR;
    mercury.current.rotation.y += EARTH_YEAR * 1.6;
    venus.current.rotation.y += EARTH_YEAR * 1.175;
    mars.current.rotation.y += EARTH_YEAR * 0.808;
    jupiter.current.rotation.y += EARTH_YEAR * 0.4388;
    saturn.current.rotation.y += EARTH_YEAR * 0.3253;
    uranus.current.rotation.y += EARTH_YEAR * 0.2286;
    neptune.current.rotation.y += EARTH_YEAR * 0.1823;
    pluto.current.rotation.y += EARTH_YEAR * 0.1592;
  });
  return (
    <group ref={solar} {...props} dispose={null}>
      <group name="sun">
        <group ref={mercury} name="mercury_1">
          <Planet
            name="mercury"
            position={[SPACE, 0, 0]}
            // rotation={[-Math.PI, 1.2, -Math.PI]}
            scale={0.05 * SCALE}
            texture={require('../assets/textures/2k_mercury.jpg')}
            colorA={[0.925, 0.995, 0.995]}
            colorB={[1.0, 0.939, 0.836]}
          />
        </group>
        <group ref={venus} name="venus_1" rotation={[0, 1, 0]}>
          <Planet
            name="venus"
            position={[(SPACE * 2) / 1.5, 0, 0]}
            // rotation={[-Math.PI, -0.44, Math.PI]}
            scale={0.13 * SCALE}
            texture={require('../assets/textures/2k_venus_surface.jpg')}
            colorA={[0.995, 0.843, 0.12]}
            colorB={[0.995, 0.66, 0.141]}
          />
        </group>
        <group ref={earth} name="earth_1" rotation={[0, 3.3, 0]}>
          <Planet
            name="earth"
            position={[(SPACE * 2.5) / 1.5, 0, 0]}
            // rotation={[-Math.PI, -0.43, -Math.PI]}
            scale={0.13 * SCALE}
            texture={require('../assets/textures/2k_earth_daymap.jpg')}
            colorA={[0.142, 0.545, 0.995]}
            colorB={[0.106, 0.395, 0.995]}
          />
        </group>
        <group ref={mars} name="mars_1" rotation={[0, 2.6, 0]}>
          <Planet
            name="mars"
            position={[(SPACE * 3) / 1.5, 0, 0]}
            // rotation={[-Math.PI, -0.69, -Math.PI]}
            scale={0.1 * SCALE}
            texture={require('../assets/textures/2k_mars.jpg')}
            colorA={[0.995, 0.464, 0.173]}
            colorB={[0.995, 0.303, 0.13]}
          />
        </group>
        <group ref={jupiter} name="jupiter_1" rotation={[0, 0.5, 0]}>
          <Planet
            name="jupiter"
            position={[(SPACE * 3.75) / 1.5, 0, 0]}
            // rotation={[-Math.PI, -0.68, Math.PI]}
            scale={0.25 * SCALE}
            texture={require('../assets/textures/2k_jupiter.jpg')}
            colorA={[0.913, 0.995, 0.976]}
            colorB={[0.995, 0.809, 0.692]}
          />
        </group>
        <group ref={saturn} name="saturn_1" rotation={[0, -0.5, 0]}>
          <Planet
            name="saturn"
            position={[(SPACE * 4.5) / 1.5, 0, 0]}
            // rotation={[Math.PI, -0.43, -Math.PI]}
            scale={0.22 * SCALE}
            texture={require('../assets/textures/2k_saturn.jpg')}
            ring={require('../assets/textures/2k_saturn_ring_alpha.png')}
            colorA={[0.995, 0.961, 0.833]}
            colorB={[0.995, 0.903, 0.76]}
          />
        </group>
        <group ref={uranus} name="uranus_1" rotation={[0, 0.7, 0]}>
          <Planet
            name="uranus"
            position={[(SPACE * 5.25) / 1.5, 0, 0]}
            // rotation={[-Math.PI, -0.44, Math.PI]}
            scale={0.17 * SCALE}
            texture={require('../assets/textures/2k_uranus.jpg')}
            colorA={[0.864, 0.995, 0.976]}
            colorB={[0.577, 0.976, 0.995]}
          />
        </group>
        <group ref={neptune} name="neptune_1" rotation={[0, 0.2, 0]}>
          <Planet
            name="neptune"
            position={[(SPACE * 5.75) / 1.5, 0, 0]}
            // rotation={[-Math.PI, -0.43, -Math.PI]}
            scale={0.17 * SCALE}
            texture={require('../assets/textures/2k_neptune.jpg')}
            colorA={[0.242, 0.45, 0.995]}
            colorB={[0.112, 0.259, 0.995]}
          />
        </group>
        <group ref={pluto} name="pluto_1" rotation={[0, 0.4, 0]}>
          <Planet
            name="pluto"
            position={[(SPACE * 6.25) / 1.5, 0, 0]}
            // rotation={[-Math.PI, -0.43, -Math.PI]}
            scale={0.04 * SCALE}
            texture={require('../assets/textures/Pluto_Made.webp')}
            colorA={[0.89, 0.917, 0.945]}
            colorB={[0.975, 0.889, 0.821]}
          />
        </group>
        <group>
          <Planet
            name="sun"
            scale={0.8 * SCALE}
            colorA={[1.0, 0.755, 0.102]}
            colorB={[1.0, 0.508, 0.101]}
            texture={require('../assets/textures/2k_sun.jpg')}
          />
        </group>
      </group>
    </group>
  );
};

export default Solar;
