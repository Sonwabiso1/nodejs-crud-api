const http = require('http');
const fs = require('fs');

const port = '3000';
const hostname = '127.0.0.1';

// File where data is stored
const dataFile = './items.json';

// Helper function to read the file
const readDataFromFile = (callback) => {
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(data || '[]'));
    }
  });
};

// Helper function to write data to the file
const writeDataToFile = (data, callback) => {
  fs.writeFile(dataFile, JSON.stringify(data), 'utf8', callback);
};

// Creating the server

const server = http.createServer((req, res) => {
  
  
  
  const { method, url } = req;

  // Setting common response headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');

  if (method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // GET /items - Read all items
  if (method === 'GET' && url === '/items') {
    readDataFromFile((items) => {
      res.writeHead(200);
      res.end(JSON.stringify(items));
    });

  // POST /items - Create a new item
  } else if (method === 'POST' && url === '/items') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const newItem = JSON.parse(body);
      readDataFromFile((items) => {
        newItem.id = Date.now().toString();
        items.push(newItem);
        writeDataToFile(items, () => {
          res.writeHead(201);
          res.end(JSON.stringify(newItem));
        });
      });
    });

  // PUT /items/:id - Update an item
  } else if (method === 'PUT' && url.startsWith('/items/')) {
    const id = url.split('/')[2];
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const updatedItem = JSON.parse(body);
      readDataFromFile((items) => {
        const index = items.findIndex(item => item.id === id);
        if (index === -1) {
          res.writeHead(404);
          res.end(JSON.stringify({ message: 'Item not found' }));
        } else {
          items[index] = { ...items[index], ...updatedItem };
          writeDataToFile(items, () => {
            res.writeHead(200);
            res.end(JSON.stringify(items[index]));
          });
        }
      });
    });

  // DELETE /items/:id - Delete an item
  } else if (method === 'DELETE' && url.startsWith('/items/')) {
    const id = url.split('/')[2];
    readDataFromFile((items) => {
      const filteredItems = items.filter(item => item.id !== id);
      writeDataToFile(filteredItems, () => {
        res.writeHead(204);
        res.end();
      });
    });

  } else {
    // Handling other routes
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

// Server listens on port 3000
server.listen(3000, () => {
  console.log('Server running on port 3000');
});
