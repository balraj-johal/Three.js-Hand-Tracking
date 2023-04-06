import { Hands, Results } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import { useEffect, useState } from "react";
import SceneWrapper, { Vec3 } from "./Scene";

const landmarkIndex = 9; // track base of middle finger

export default function HandsComponent() {
  const [leftHandPos, setLeftHandPos] = useState<Vec3>({ x: 0, y: 1, z: 0 }!);
  const [rightHandPos, setRightHandPos] = useState<Vec3>({ x: 0, y: 1, z: 0 }!);

  useEffect(() => {
    function onResults(results: Results) {
      results.multiHandedness.forEach((handFlag) => {
        const hand = results.multiHandLandmarks[handFlag.index];
        let manipulatedPosition;
        if (hand) manipulatedPosition = hand[landmarkIndex];
        if (manipulatedPosition) {
          manipulatedPosition.y = 1.0 - manipulatedPosition.y;
          manipulatedPosition.z = -manipulatedPosition.z;
        }
        if (manipulatedPosition) {
          if (handFlag.label === "Left")
            setLeftHandPos(manipulatedPosition as Vec3);
          if (handFlag.label === "Right")
            setRightHandPos(manipulatedPosition as Vec3);
        }
      });
    }

    const videoElement = document.getElementsByClassName(
      "input_video"
    )[0] as HTMLVideoElement;
    videoElement.style.transform = "scaleX(-1)";

    const constraints = {
      audio: false,
      video: true,
      facingMode: { exact: "environment" },
    };

    function handleSuccess(stream: any) {
      const hands = new Hands({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        },
      });
      hands.setOptions({
        maxNumHands: 2,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
        modelComplexity: 0,
        selfieMode: true,
      });
      console.log(hands);
      hands.onResults(onResults);
      const camera = new Camera(videoElement, {
        onFrame: async () => {
          await hands.send({ image: videoElement });
        },
        width: 1280,
        height: 720,
      });
      camera.start();
      videoElement.srcObject = stream;
    }

    function handleError(error: any) {
      console.log(
        "navigator.MediaDevices.getUserMedia error: ",
        error.message,
        error.name
      );
    }

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(handleSuccess)
      .catch(handleError);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <video
        autoPlay
        playsInline
        className="input_video"
        style={{ width: "100%" }}
      ></video>
      <SceneWrapper leftTarget={leftHandPos} rightTarget={rightHandPos} />
    </div>
  );
}
