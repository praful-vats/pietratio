import React, { useRef, useEffect } from 'react';

function AsciiArt() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const getAsciiArt = async () => {
      const density = '█▄▂10x. ';
      // .x?▂▄▆█ █▆▄▂?x.
      const asciiArt = [];

      // Get the video stream from the camera
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } catch (error) {
        console.error('Error accessing camera:', error);
        return;
      }

      // Get the canvas context and set its dimensions to match the video
      const context = canvasRef.current.getContext('2d');
      videoRef.current.addEventListener('loadedmetadata', () => {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
      });

      // Continuously capture frames from the video stream and convert them to ascii art
      const captureFrame = () => {
        context.drawImage(videoRef.current, 0, 0);
        const imageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
        asciiArt.length = 0;
        for (let i = 0; i < imageData.data.length; i += 4) {
          const r = imageData.data[i];
          const g = imageData.data[i + 1];
          const b = imageData.data[i + 2];
          const brightness = Math.round((r + g + b) / 3 / 255 * (density.length - 1));
          asciiArt.push(density[brightness]);
        }
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.font = '2px ';
        for (let y = 0; y < canvasRef.current.height; y += 8) {
          for (let x = 0; x < canvasRef.current.width; x += 8) {
            const index = (y * canvasRef.current.width) + x;
            const character = asciiArt[index];
            context.fillText(character, x, y);
          }
        }
        requestAnimationFrame(captureFrame);
      };

      requestAnimationFrame(captureFrame);
    };

    getAsciiArt();
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
      <video
        ref={videoRef}
        style={{ transform: 'scaleX(1)' }}
      />
      <style>
        {`
          video {
            display: none;
          }
        `}
      </style>
    </div>
  );
}

export default AsciiArt;