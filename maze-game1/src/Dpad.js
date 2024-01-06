import React from 'react';
import './MazeGame.css';

const Dpad = ({ onMove }) => {
  const handleMove = (direction) => {
    onMove(direction);
  };

  return (
    <div className="dpad">
      <button className="dpad-button" onClick={() => handleMove('up')}>
        &#9650;
      </button>
      <div className="horizontal-buttons">
        <button className="dpad-button" onClick={() => handleMove('left')}>
          &#9664;
        </button>
        <button className="dpad-button" onClick={() => handleMove('right')}>
          &#9654;
        </button>
      </div>
      <button className="dpad-button" onClick={() => handleMove('down')}>
        &#9660;
      </button>
    </div>
  );
};

export default Dpad;
