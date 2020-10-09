import React, {useCallback, useState} from 'react';
import useWebsocket from "./hooks/useWebsocket";
import { ICell } from "./interfaces";

function App() {
  const [startGame, getGameMap, openCell, gameMap] = useWebsocket();
  const [level, changeLevel] = useState(0);
  const handleClick = useCallback((e) => {
    const data = e.target.dataset;
    // @ts-ignore
    openCell({
      x: data.x - 1,
      y: data.y
    })
  }, [openCell]);

  const updateGameLevel = useCallback((e) => {
    changeLevel(e.target.value);
    // @ts-ignore
    startGame(e.target.value)
    // @ts-ignore
    getGameMap()
  }, [startGame, getGameMap])


  return (
    <div className="App">
      <label htmlFor="level">
        Choose game level and start playing
      </label>
      <select id="level" onChange={updateGameLevel} value={level}>
        <option value="0">Not selected/Reset</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <div className='window'>
        <table onClick={handleClick}>
          <tbody>
          {Object.keys(gameMap).map(val => {
            // @ts-ignore
            const arr = gameMap[val];
            return <tr key={val}>
              {arr.map((i: ICell) => <td  key={val + i.cellCounter}>
                <span className={i.status === 'You lose' ? 'lose' : i.status === 'OK' ? 'ok': 'default'} data-y={val} data-x={i.cellCounter} />
              </td>)}
            </tr>
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
