import { Box } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export type Vec3 = {
  x: number;
  y: number;
  z: number;
};

interface Props {
  handOnePos: Vec3;
}

const inputScaler = 5;

export default function SceneWrapper({ handOnePos }: Props) {
  console.log("handOnePos", handOnePos);
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box
        position={[
          inputScaler * handOnePos.x,
          inputScaler * handOnePos.y,
          handOnePos.z,
        ]}
      />
    </Canvas>
  );
}
