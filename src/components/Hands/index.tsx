import { Hands } from "@mediapipe/hands";
import { useEffect } from "react";

export default function HandsComponent() {
  useEffect(() => {
    // const hands = new Hands();
    // hands.setOptions({
    //   maxNumHands: 2,
    //   minDetectionConfidence: 0.5,
    //   minTrackingConfidence: 0.5,
    // });
    // console.log(hands);
    // function onResults(results: any) {}

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
      videoElement.srcObject = stream;
      console.log(stream);
      canvasElement.width = videoElement.videoWidth;
      canvasElement.height = videoElement.videoHeight;
      if (canvasElement) {
        canvasElement
          .getContext("2d")
          ?.drawImage(
            videoElement,
            0,
            0,
            canvasElement.width,
            canvasElement.height
          );
      }
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
