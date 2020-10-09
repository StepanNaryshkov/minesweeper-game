const helper = (data) =>  {
    const resMap = {};
    let counter = -1;
    let cellCounter = 0;

    for(let i = 4; i < data.length; i++) {
      if (data[i] === "\n") {
        counter++;
        cellCounter = 0
      }

      if (resMap[counter]) {
        cellCounter++;
        resMap[counter].push({
          status: 'closed',
          cellCounter: cellCounter + ''
        });
      } else {
        resMap[counter + ''] = [];
      }

    }

    return resMap;
}

export default helper;
