import { Box, Sphere } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Debug, Physics, RigidBody } from "@react-three/rapier";

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
        <Physics>
          <Debug />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Interaction leftHandPos={leftHandPos} rightHandPos={rightHandPos} />
        </Physics>
      </Canvas>
    </div>
  );
}

function Interaction({ leftHandPos, rightHandPos }: Props) {
  const { viewport } = useThree();
  return (
    <>
      <RigidBody
        type="kinematicPosition"
        position={[
          viewport.width * (leftHandPos.x - 0.5),
          viewport.height * (leftHandPos.y - 0.5),
          0.0,
        ]}
      >
        <Sphere>
          <meshPhysicalMaterial color="hotpink" />
        </Sphere>
      </RigidBody>
      <RigidBody
        type="kinematicPosition"
        position={[
          viewport.width * (rightHandPos.x - 0.5),
          viewport.height * (rightHandPos.y - 0.5),
          0.0,
        ]}
      >
        <Sphere>
          <meshPhysicalMaterial color="orange" />
        </Sphere>
      </RigidBody>

      <RigidBody>
        <Box position={[0, 1, 0.0]}>
          <meshPhysicalMaterial color="red" />
        </Box>
      </RigidBody>

      <RigidBody type="fixed">
        <Box
          position={[0, -viewport.height / 3, 0.0]}
          scale={[viewport.width * 2, 0.5, 5.0]}
        >
          <meshPhysicalMaterial color="green" />
        </Box>
      </RigidBody>
    </>
  );
}
