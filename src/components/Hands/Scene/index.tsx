import { Box } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";

export type Vec3 = {
  x: number;
  y: number;
  z: number;
};

interface Props {
  leftHandPos: Vec3;
  rightHandPos: Vec3;
}

export default function SceneWrapper({ leftHandPos, rightHandPos }: Props) {
  return (
    <div
      style={{
        border: "1px solid red",
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
      }}
    >
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Interaction leftHandPos={leftHandPos} rightHandPos={rightHandPos} />
      </Canvas>
    </div>
  );
}

function Interaction({ leftHandPos, rightHandPos }: Props) {
  const { viewport } = useThree();
  return (
    <>
      <Box
        position={[
          viewport.width * (leftHandPos.x - 0.5),
          viewport.height * (leftHandPos.y - 0.5),
          leftHandPos.z,
        ]}
      />
    </>
  );
}
