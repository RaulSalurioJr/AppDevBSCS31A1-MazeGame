import React, { useState, useMemo, useEffect } from "react";
import { generateMaze, solve } from "./util";
import "./MazeGame.css";
import Dpad from "./Dpad";

const MazeGame = () => {
  const [gameId, setGameId] = useState(1);
  const [status, setStatus] = useState("playing");
  const [size, setSize] = useState(8);
  const [cheatMode, setCheatMode] = useState(false);
  const [userPosition, setUserPosition] = useState([0, 0]);

  const handleTouchStart = (e) => {

  };

  const handleTouchMove = (e) => {

  };

  const handleTouchEnd = (e) => {

  };

  const maze = useMemo(() => generateMaze(size, size), [size, gameId]);
  const solution = useMemo(() => {
    const s = new Set();
    const solutionPath = solve(maze, userPosition[0], userPosition[1]);
    solutionPath.forEach((path) => {
      const [x, y] = path;
      s.add(String(x) + "-" + String(y));
    });
    return s;
  }, [size, userPosition[0], userPosition[1], gameId]);

  useEffect(() => {
    const lastRowIndex = maze.length - 1;
    const lastColIndex = maze[0].length - 1;
    if (userPosition[0] === lastRowIndex && userPosition[1] === lastColIndex) {
      setStatus("won");
    }
  }, [userPosition[0], userPosition[1]]);

  const makeClassName = (i, j) => {
    const rows = maze.length;
    const cols = maze[0].length;
    let arr = [];
    if (maze[i][j][0] === 0) {
      arr.push("topWall");
    }
    if (maze[i][j][1] === 0) {
      arr.push("rightWall");
    }
    if (maze[i][j][2] === 0) {
      arr.push("bottomWall");
    }
    if (maze[i][j][3] === 0) {
      arr.push("leftWall");
    }
    if (i === rows - 1 && j === cols - 1) {
      arr.push("destination");
    }
    if (i === userPosition[0] && j === userPosition[1]) {
      arr.push("currentPosition");
    }
    if (cheatMode && solution.has(String(i) + "-" + String(j))) {
      arr.push("sol");
    }
    if (i === 0 && j === 0) {
      arr.push("startingPoint");
    }
    return arr.join(" ");
  };

  const handleMove = (e) => {
    e.preventDefault();
    if (status !== "playing") {
      return;
    }
    const key = e.code;

    const [i, j] = userPosition;
    if ((key === "ArrowUp" || key === "KeyW") && maze[i][j][0] === 1) {
      setUserPosition([i - 1, j]);
    }
    if ((key === "ArrowRight" || key === "KeyD") && maze[i][j][1] === 1) {
      setUserPosition([i, j + 1]);
    }
    if ((key === "ArrowDown" || key === "KeyS") && maze[i][j][2] === 1) {
      setUserPosition([i + 1, j]);
    }
    if ((key === "ArrowLeft" || key === "KeyA") && maze[i][j][3] === 1) {
      setUserPosition([i, j - 1]);
    }
  };

  const handleUpdateSettings = () => {
    const selectedSize = document.querySelector("select[name='mazeSize']").value;
    setSize(parseInt(selectedSize, 10));
    setUserPosition([0, 0]);
    setStatus("playing");
    setGameId(gameId + 1);
  };

  const handleDpadMove = (direction) => {
    const [i, j] = userPosition;

    switch (direction) {
      case "up":
        if (i > 0 && maze[i][j][0] === 1) {
          setUserPosition([i - 1, j]);
        }
        break;
      case "right":
        if (j < maze[0].length - 1 && maze[i][j][1] === 1) {
          setUserPosition([i, j + 1]);
        }
        break;
      case "down":
        if (i < maze.length - 1 && maze[i][j][2] === 1) {
          setUserPosition([i + 1, j]);
        }
        break;
      case "left":
        if (j > 0 && maze[i][j][3] === 1) {
          setUserPosition([i, j - 1]);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="App" onKeyDown={handleMove} tabIndex={-1}>
      <div className="setting">
        <label htmlFor="mazeSize">Size of maze: </label>
        <select name="mazeSize" defaultValue="8">
          <option value="8">8x8</option>
          <option value="16">16x16</option>
          <option value="32">32x32</option>
        </select>
      </div>
      <div className="setting">
        <button onClick={handleUpdateSettings}>
          <b>Let's go!</b>
        </button>
      </div>
      <div>
        <label htmlFor="cheatMode">Reveal the path</label>
        <input
          type="checkbox"
          name="cheatMode"
          onChange={(e) => setCheatMode(e.target.checked)}
        />
      </div>

      <table id="maze">
        <tbody>
          {maze.map((row, i) => (
            <tr key={`row-${i}`}>
              {row.map((cell, j) => (
                <td key={`cell-${i}-${j}`} className={makeClassName(i, j)}>
                  <div />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Dpad onMove={handleDpadMove} />

      {status !== "playing" && (
        <div className="info" onClick={handleUpdateSettings}>
          <p>WOOHOO!!!</p>
          <img src={require('./images/Won.png')} alt="Winner"
          style={{ width: '200px', height: '200px' }} />
          <p>(CLICK HERE TO PLAY AGAIN!)</p>
        </div>
      )}
    </div>
  );
};

export default MazeGame;
