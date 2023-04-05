import { Canvas } from '@react-three/fiber/native';
import { TextureLoader } from 'expo-three';
import useControls from 'r3f-native-orbitcontrols';
import { Suspense } from 'react';
import { SafeAreaView } from 'react-native';
import { logger } from 'react-native-logs';
import Solar from './components/Solar';
export const log = logger.createLogger({
  transportOptions: {
    colors: {
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
      debug: 'white',
    },
  },
});
export default function App() {
  const [OrbitControls, events] = useControls();
  const created = ({ scene }) => {
    // This texture will be immediately ready but it'll load asynchronously
    const texture = new TextureLoader().load(require('./assets/envs/8k_stars_milky_way.jpg'));
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    scene.background = texture;
  };
  return (
    <SafeAreaView style={{ flex: 1 }} {...events}>
      <Canvas
        onCreated={created}
        camera={{
          fov: 75,
          near: 0.01,
          far: 1000,
          position: [60, 120, 60],
        }}
      >
        <Suspense fallback={null}>
          <Solar />
        </Suspense>
        <OrbitControls />
        <hemisphereLight intensity={0.7} color="white" />
      </Canvas>
    </SafeAreaView>
  );
}
