import { Box, Sphere } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Debug, Physics, RigidBody } from "@react-three/rapier";
import { useRef } from "react";

const lerp = (a: number, b: number, t: number) => {
  return a + (b - a) * t;
};

export type Vec3 = {
  x: number;
  y: number;
  z: number;
};

interface Props {
  leftTarget: Vec3;
  rightTarget: Vec3;
}

export default function SceneWrapper({
  leftTarget: leftHandPos,
  rightTarget: rightHandPos,
}: Props) {
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
          <Interaction leftTarget={leftHandPos} rightTarget={rightHandPos} />
        </Physics>
      </Canvas>
    </div>
  );
}

const LERP_SPEED = 0.1;

function Interaction({ leftTarget, rightTarget }: Props) {
  const { viewport } = useThree();
  const leftHandPos = useRef({
    x: 0.0,
    y: 1.0,
    z: 0.0,
  });
  const rightHandPos = useRef({
    x: 0.0,
    y: 1.0,
    z: 0.0,
  });

  useFrame(() => {
    leftHandPos.current.x = lerp(
      leftHandPos.current.x,
      leftTarget.x,
      LERP_SPEED
    );
    leftHandPos.current.y = lerp(
      leftHandPos.current.y,
      leftTarget.y,
      LERP_SPEED
    );
    rightHandPos.current.x = lerp(
      rightHandPos.current.x,
      rightTarget.x,
      LERP_SPEED
    );
    rightHandPos.current.y = lerp(
      rightHandPos.current.y,
      rightTarget.y,
      LERP_SPEED
    );
  });

  return (
    <>
      <RigidBody
        type="kinematicPosition"
        position={[
          viewport.width * (leftHandPos.current.x - 0.5),
          viewport.height * (leftHandPos.current.y - 0.5),
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
          viewport.width * (rightHandPos.current.x - 0.5),
          viewport.height * (rightHandPos.current.y - 0.5),
          0.0,
        ]}
      >
        <Sphere>
          <meshPhysicalMaterial color="orange" />
        </Sphere>
      </RigidBody>

      <RigidBody enabledTranslations={[true, true, false]}>
        <Box position={[0, 1, 0.0]}>
          <meshPhysicalMaterial color="red" />
        </Box>
      </RigidBody>

      <RigidBody type="fixed">
        <Box
          position={[0, -viewport.height / 4, 0.0]}
          scale={[viewport.width * 2, 0.5, 1.0]}
        >
          <meshPhysicalMaterial color="green" />
        </Box>
      </RigidBody>
    </>
  );
}
