function formatData(data, colmumns = "all") {
  let formattedData = [];
  if (colmumns === "all") {
    let allKeys = Object.keys(data[0]);
    for (let i = 0; i < data.length; i++) {
      let row = {};
      for (let j = 0; j < allKeys.length; j++) {
        row[allKeys[j]] = data[i][allKeys[j]];
      }
      formattedData.push(row);
    }
    return [formattedData, allKeys];
  } else {
    for (let i = 0; i < data.length; i++) {
      let row = {};
      for (let j = 0; j < colmumns.length; j++) {
        row[colmumns[j]] = data[i][colmumns[j]];
      }
      formattedData.push(row);
    }
  }
  return [formattedData, colmumns];
}

export default formatData;
