const fs = require('fs');

/*
\r = CR (Carriage Return) → Used as a new line character in Mac OS before X
\n = LF (Line Feed) → Used as a new line character in Unix/Mac OS X
\r\n = CR + LF → Used as a new line character in Windows
*/

convertTxtToArraySync = (filePath, encoder) => {
  let newArray;
  let textFile = fs.readFileSync(`${__dirname}/${filePath}`, encoder);

  // Check the new line character of the file so that we can slice according to its delimiter.

  /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

  // Check if it's window txt file
  if (textFile.indexOf('\r\n') !== -1) {
    console.log('This file has CRLF');
    // This is needed only for file encoded with 'utf-8 with BOM'. But how do I know beforehand?
    // textFile = textFile.slice(1);
    newArray = textFile.split('\r\n');

    /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

    // Check if it's Unix/Mac OS X txt file
  } else if (textFile.indexOf('\n') !== -1) {
    console.log('This file has LF');
    // My attempt to try to check if first character is invalid. My guess is that invalid first character only appear when it's being decoded on Windows computer.
    // const initialChar = textFile.slice(0, 1);
    // if (initialChar !== ﻿) {
    //   textFile = textFile.slice(1);
    // }
    textFile = textFile.slice(1);
    newArray = textFile.split('\n');

    /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

    // Check if it's Mac OS before X txt file
  } else if (textFile.indexOf('\r') !== -1) {
    console.log('This file has CR');
    textFile = textFile.slice(1);
    newArray = textFile.split('\r');
  } else {
    newArray = [];
    newArray.push(textFile.slice(0));
  }
  
  // Filter out falsy array values to keep array clean. Source: https://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript
  newArray = newArray.filter(function (el) {
    return el;
  });

  return newArray;
};

module.exports = convertTxtToArraySync;
