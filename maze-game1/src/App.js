import React, { useState } from 'react';
import Modal from 'react-modal';
import MazeGame from './MazeGame';

import './App.css';

const Home = () => {
  const [instructionsModalIsOpen, setInstructionsModalIsOpen] = useState(false);
  const [aboutUsModalIsOpen, setAboutUsModalIsOpen] = useState(false);
  const [startModalIsOpen, setStartModalIsOpen] = useState(false);
  const [mazeGameIsOpen, setMazeGameIsOpen] = useState(false);

  const openInstructionsModal = () => {
    setInstructionsModalIsOpen(true);
  };

  const closeInstructionsModal = () => {
    setInstructionsModalIsOpen(false);
  };

  const openAboutUsModal = () => {
    setAboutUsModalIsOpen(true);
  };

  const closeAboutUsModal = () => {
    setAboutUsModalIsOpen(false);
  };

  const openStartModal = () => {
    setStartModalIsOpen(true);
  };

  const closeStartModal = () => {
    setStartModalIsOpen(false);
  };

  const startGame = () => {
    closeStartModal();
    setMazeGameIsOpen(true);
  };

  const goToTitleScreen = () => {
    setMazeGameIsOpen(false);
  };

  return (
    <div className="home-container">
      <button className="home-button" onClick={goToTitleScreen}>
        Home
      </button>
      {mazeGameIsOpen ? (
        <MazeGame size={8} onClose={goToTitleScreen} />
      ) : (
        <>
          <h1>CRAYON SHINCHAN'S GREAT ESCAPE!</h1>
          <p>Help Crayon Shinchan find the exit.</p>
          <div className="button-container">
            <button className="start-button" onClick={startGame}>
              Start Game
            </button>
            <button className="instruction-button" onClick={openInstructionsModal}>
              Instructions
            </button>
            <button className="aboutUs-button" onClick={openAboutUsModal}>
              About Us
            </button>
          </div>
        </>
      )}

      <Modal
        isOpen={instructionsModalIsOpen}
        onRequestClose={closeInstructionsModal}
        contentLabel="Instructions Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Instructions</h2>
        <h3>For PC</h3>
        <p>Use A or ← to move to the left</p>
        <p>Use S or ↓ to move down</p>
        <p>Use D or → to move to the right</p>
        <p>Use W or ↑ to move up</p>
        <p>You can use on screen directional button as well</p>
        <h3>For Mobile</h3>
        <p>On screen directional button only</p>
        <p>Using this navigations, help Crayon Shinchan find the exit</p>
        <button onClick={closeInstructionsModal}>Close</button>
      </Modal>

      <Modal
        isOpen={aboutUsModalIsOpen}
        onRequestClose={closeAboutUsModal}
        contentLabel="About Us Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>About Us</h2>
        <p>BSCS31A1 - Application Development </p>
        <p>Raul Salurio Jr.</p>
        <button onClick={closeAboutUsModal}>Close</button>
      </Modal>

      <Modal
        isOpen={startModalIsOpen}
        onRequestClose={closeStartModal}
        contentLabel="Start Game Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Start Game</h2>
        <button onClick={startGame}>Start Game</button>
        <button onClick={closeStartModal}>Cancel</button>
      </Modal>

    </div>
  );
};

export default Home;
