import { Canvas } from '@react-three/fiber/native';
import useControls from 'r3f-native-orbitcontrols';
import { Suspense, useState } from 'react';
import { View } from 'react-native';
import Planet from './components/Planet';
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
export default function App() {
  const [OrbitControls, events] = useControls();
  const [loaded, setLoaded] = useState(false);
  const created = ({ scene }) => {
    scene.background = new THREE.Color('skyblue');
    const loadingManager = new THREE.LoadingManager(
      // Loaded
      () => {
        // Wait a little
        window.setTimeout(() => {
          setLoaded(true);
        }, 500);
      },

      // Progress
      (itemUrl, itemsLoaded, itemsTotal) => {
        // Calculate the progress and update the loadingBarElement
        // const progressRatio = itemsLoaded / itemsTotal
      }
    );

    new RGBELoader(loadingManager).load('./assets/envs/8k_stars_milky_way.hdr', function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.minFilter = THREE.NearestFilter;
      texture.magFilter = THREE.NearestFilter;
      // scene.background = texture;
      scene.environment = texture;
    });
  };
  return (
    <View style={{ flex: 1 }} {...events}>
      <Canvas onCreated={created}>
        <Suspense fallback={null}>
          <Planet />
        </Suspense>
        <OrbitControls />
        <ambientLight />
      </Canvas>
    </View>
  );
}
