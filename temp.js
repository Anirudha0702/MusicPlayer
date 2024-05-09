const fs = require('fs');
const path = require('path');

const directoryPath = './Music'; // Change this to your directory path

fs.readdir(directoryPath, function(err, files) {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    const fileNames = files.filter(file => fs.statSync(path.join(directoryPath, file)).isFile());
    let jsCode = `const songs = [`;
    for (let i = 0; i < fileNames.length; i++) {
        jsCode += `
    {
        id: ${i + 1},
        title: '${fileNames[i].split('.')[0]}',
        src: './Music/${fileNames[i]}',
        img: './Images/${fileNames[i].split('.')[0]}.jpg'
    },`;
    }
    jsCode += `]`;

    fs.writeFile('./pathMap.js', jsCode, function(err) {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('File names array saved to fileNames.js');
    });
});
