const fs = require('fs');

// Read the contents of json.md
fs.readFile('json.md', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Extract the JSON data
  const jsonStartIndex = data.indexOf('```json');
  const jsonEndIndex = data.indexOf('```', jsonStartIndex + 1);
  const jsonData = data.substring(jsonStartIndex + 7, jsonEndIndex).trim();

  try {
    // Write the JSON data to json.js
    fs.writeFile('json.js', `module.exports = ${jsonData};`, (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }
      console.log('JSON data successfully exported to json.js');
    });

    // Export jsonData
    module.exports = jsonData;
  } catch (error) {
    console.error('Error parsing JSON data:', error);
  }
});
