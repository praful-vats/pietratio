import React from 'react';
import {Joystick} from 'react-joystick-component';

function JoystickControl() {
  const handleJoystickMove = (event) => {
    console.log(event);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Joystick size={140} baseColor="#FFFFFF" stickColor="#000000" move={handleJoystickMove} />
    </div>
  );
}

export default JoystickControl;

