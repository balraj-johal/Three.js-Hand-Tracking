import { Box } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export type Vec3 = {
  x: number;
  y: number;
  z: number;
};

interface Props {
  leftHandPos: Vec3;
  rightHandPos: Vec3;
}

const inputScaler = 5;

export default function SceneWrapper({ leftHandPos }: Props) {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box
        position={[
          inputScaler * leftHandPos.x,
          inputScaler * leftHandPos.y,
          leftHandPos.z,
        ]}
      />
    </Canvas>
  );
}
