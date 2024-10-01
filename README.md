# Node.js CRUD REST API

This is a simple REST API built with Node.js that performs basic CRUD (Create, Read, Update, Delete) operations for a list of items. The API is built using Node's `http` module to handle requests and `fs` module to manage data storage in a JSON file (`items.json`).

## Features

- **GET**: Retrieve all items
- **POST**: Add a new item
- **PUT**: Update an item by ID
- **DELETE**: Delete an item by ID

## Requirements

- Node.js (version 12 or higher)

## Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/nodejs-crud-api.git
cd nodejs-crud-api
```

### 2. Install Node.js (if not already installed)
You can download and install Node.js from [here](https://nodejs.org/).

### 3. Create the `items.json` file
Before starting the server, create an empty `items.json` file in the root directory of the project. Initialize it with an empty array:

```json
[]
```

### 4. Start the server
You can start the API server by running:

```bash
node app.js
```

The server will run on `http://127.0.0.1:3000` by default.

## API Endpoints

### 1. **GET** `/items`

Retrieve all items.

- **Request**: 
  ```bash
  curl http://127.0.0.1:3000/items
  ```
- **Response**:
  ```json
  [
    {
      "id": "1694436328674",
      "name": "Sample item"
    }
  ]
  ```

### 2. **POST** `/items`

Create a new item.

- **Request**:
  ```bash
  curl -X POST http://127.0.0.1:3000/items -H "Content-Type: application/json" -d '{"name": "New Item"}'
  ```
- **Response**:
  ```json
  {
    "id": "1694436328674",
    "name": "New Item"
  }
  ```

### 3. **PUT** `/items/:id`

Update an existing item by ID.

- **Request**:
  ```bash
  curl -X PUT http://127.0.0.1:3000/items/1694436328674 -H "Content-Type: application/json" -d '{"name": "Updated Item"}'
  ```
- **Response**:
  ```json
  {
    "id": "1694436328674",
    "name": "Updated Item"
  }
  ```

### 4. **DELETE** `/items/:id`

Delete an item by ID.

- **Request**:
  ```bash
  curl -X DELETE http://127.0.0.1:3000/items/1694436328674
  ```
- **Response**:
  ```bash
  # No content, 204 status code
  ```

## Code Breakdown

### `app.js`

- **http**: Handles HTTP requests.
- **fs**: Manages reading and writing data to `items.json`.
- **readDataFromFile()**: Reads the JSON file and returns the items.
- **writeDataToFile()**: Writes data (items) to the JSON file.
- **HTTP Methods**:
  - `GET /items`: Reads all items from `items.json`.
  - `POST /items`: Adds a new item with an auto-generated ID.
  - `PUT /items/:id`: Updates an existing item based on ID.
  - `DELETE /items/:id`: Deletes an item based on ID.

## Testing the API

You can test the API using **Postman** or **cURL**.

### Using Postman

1. **GET Request**:
   - Set the method to `GET`.
   - URL: `http://127.0.0.1:3000/items`.
   - Send the request and view the list of items.

2. **POST Request**:
   - Set the method to `POST`.
   - URL: `http://127.0.0.1:3000/items`.
   - In the **Body** tab, choose **raw** and set the type to **JSON**. Add the data:
     ```json
     { "name": "New Item" }
     ```
   - Send the request.

3. **PUT Request**:
   - Set the method to `PUT`.
   - URL: `http://127.0.0.1:3000/items/:id` (replace `:id` with the item's ID).
   - In the **Body** tab, choose **raw** and set the type to **JSON**. Add the updated data:
     ```json
     { "name": "Updated Item" }
     ```
   - Send the request.

4. **DELETE Request**:
   - Set the method to `DELETE`.
   - URL: `http://127.0.0.1:3000/items/:id` (replace `:id` with the item's ID).
   - Send the request.

### Using cURL

You can also use cURL to interact with the API from the command line, as shown in the examples above.
