const fs = require('fs');

interface file {
  id: number;
  name: string;
}
// users in JSON file for simplicity, store in a db for production applications
let filename = require('./data/filename.json');

export const getFileName = {
  getName: () => filename[0].name,
};

export function update(name: string) {
  filename = null;
  const file: file = {
    id: 0,
    name: name,
  };

  // add and save fileName
  filename = [file];
  saveData();
}

// private helper functions

function saveData() {
  fs.writeFileSync('./src/pages/api/operations/data/filename.json', JSON.stringify(filename, null, 4));
}
