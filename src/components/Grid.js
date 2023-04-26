import React, {useState, useEffect} from 'react';
import './Grid.css';
import AsciiArt from './AsciiArt';
import Ball from './Ball';
import JoystickControl from './Joystick';

function Grid() {
  const [cameraAllowed, setCameraAllowed] = useState(false);
  const [api, setApi] = useState(null);
  const handleCameraPermission = () => {
    // code to request camera permission
    setCameraAllowed(true);
  };

  return (
    <div className="container">
      <div className="item a">
        <Ball/>
      </div>
      <div className="item b">
      <div className="ascii-art-container">
      {cameraAllowed ? (
        <AsciiArt />
      ) : (
        <div>
          {/* <p className='mtext'>Allow camera for ASCII Art</p> */}
          <button className='mtext' onClick={handleCameraPermission}>ALLOW CAMERA FOR ASCII ART</button>
        </div>
      )}
    </div>
      </div>
      <div className="item c">
        <JoystickControl/>
      </div>
      <div className="item d">
        <div className='mtext'>
        GRAVITY IS AN ILLUSION
        </div>
      </div>
      <div className="item e">
        <a className='slide'>
          retroball
        </a>
      </div>
      <div className="item f">
        VOID
      </div>
      <div className="item g">
      </div>
    </div>
  );
}

export default Grid;
