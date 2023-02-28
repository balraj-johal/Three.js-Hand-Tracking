import { Hands, Results } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import { useEffect } from "react";

const landmarkIndex = 9; // track base of middle finger
const leftHand = 0;
const rightHand = 0;

export default function HandsComponent() {
  useEffect(() => {
    function onResults(results: Results) {
      const hand = results.multiHandLandmarks[0];
      let manipulatedPosition;
      if (hand) manipulatedPosition = hand[landmarkIndex];
      if (manipulatedPosition) {
        manipulatedPosition.x = 1.0 - manipulatedPosition.x;
        manipulatedPosition.z = manipulatedPosition.z * -5;
      }
      console.log(manipulatedPosition);
    }

    const videoElement = document.getElementsByClassName(
      "input_video"
    )[0] as HTMLVideoElement;
    const canvasElement = document.getElementsByClassName(
      "camera_canvas"
    )[0] as HTMLCanvasElement;

    const constraints = {
      audio: false,
      video: true,
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
      console.log(stream);
      canvasElement.width = 640;
      canvasElement.height = 480;
      console.log("test");

      // setInterval(() => {
      //   if (canvasElement) {
      //     canvasElement
      //       .getContext("2d")
      //       ?.drawImage(
      //         videoElement,
      //         0,
      //         0,
      //         canvasElement.width,
      //         canvasElement.height
      //       );
      //   }
      // }, 1000 / 60);
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
    <div>
      <video autoPlay playsInline className="input_video"></video>
      <canvas className="camera_canvas"></canvas>
    </div>
  );
}
