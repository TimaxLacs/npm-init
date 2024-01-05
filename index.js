const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar'); // you need to install it first

let textFiles = {};
const dirPath = '/path/to/your/directory';

// Initial load
fs.readdir(dirPath, (err, files) => {
    if (err) {
        console.error(`Error reading directory: ${err}`);
        return;
    }

    // Filter for '.txt' files
    files = files.filter(file => path.extname(file).toLowerCase() === '.txt');

    files.forEach(file => {
        fs.readFile(path.join(dirPath, file), 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading file: ${err}`);
                return;
            }
            // add each file content to textFiles object
            textFiles[file] = data;
        });
    });
});

// File watcher
chokidar.watch(dirPath).on('change', (filePath) => {
    if(path.extname(filePath).toLowerCase() === '.txt') {
        const file = path.basename(filePath);
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading file: ${err}`);
                return;
            }
            // update file content in textFiles object
            textFiles[file] = data;
            console.log(`Updated content of ${file}`);
        });
    }
});
