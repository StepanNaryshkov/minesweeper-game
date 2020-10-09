import { useState, useEffect, useCallback } from 'react';
import { ICurrentItem, IGameMap} from "../interfaces";
import createMap from "../helpers/createMap";

const ws = new WebSocket('wss://hometask.eg1236.com/game1/');
const countOfText = 6;

export default function useWebsocket() {
  const [gameMap, setGameMap] = useState<IGameMap>({});
  const [curItem, setCurItem] = useState<ICurrentItem>({x: "-1", y: "-1"});

  const startGame = useCallback((levelGame: string) => ws.send(`new ${levelGame}`), [])
  const getGameMap = useCallback(() => ws.send(`map`), [])
  const openCell = useCallback(({x, y}: ICurrentItem) => setCurItem({
    x,
    y
  }), [])
  const updateCell = useCallback((e) => {
    gameMap[curItem.y][+curItem.x] = {
      ...gameMap[curItem.y][+curItem.x],
      status: e.data.slice(countOfText)
    }
    setGameMap({...gameMap})
  },[curItem, gameMap])

  useEffect(() => {
    if (+curItem.x >= 0 && +curItem.y >= 0) {
      ws.send(`open ${curItem.x} ${curItem.y}`)
    }
  }, [curItem])

  useEffect(() => {
    ws.onopen = (() => console.log("opened"))
    ws.onmessage = ((e) => {
      if (e.data.indexOf('map:') === 0) {
        const result: {} = createMap(e.data)
        setGameMap(result);
      } else if (e.data.indexOf('open:') === 0) {
        updateCell(e);
      }
    })
  }, [updateCell])

  return [startGame, getGameMap, openCell, gameMap]
}
