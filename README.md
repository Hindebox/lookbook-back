
# LookBook

**LookBook** is your passport to a world of sustainable shopping.  
Say hello to a new way of discovering and sharing preloved treasures.

## API description 	

It supports the CRUD operations for sold products with names and multiple photos,  
user profiles with names and email, and swap orders that include products and involved users.  
It utilized MongoDB to store all data and Firebase for storing images and generating image URLs.

## Tools 🗃️
This API uses Bcrypt, JWT, MongoDB, Mongoose, Express and Node.js


## Installation

- Clone the Repository:

```bash
 git clone https://github.com/Hindebox/lookbook-back.git
```

- Navigate to directory
```bash
cd <your directory>
```

- Install Dependencies
```bash
 npm install
```

- Rename '.env.example' to '.env'. This file should contain your MongoDB connection string.
```bash
DB_URL=Your MongoDB connection string
```

- Database Initialization and start the API
```bash
npm run start
```

- Use this command to make autoupdating after changes
```bash
npm run dev
```

- The API will be accessible at http://localhost:2000.
You can use tools like Postman to test the API endpoints.

## API Reference

#### **USERS**

#### Get all users
```http
  GET /api/users
```

#### Get a specific user using his ID as parameter
```http
  GET /api/users/:userId
```

#### Register a new user
```http
  POST /api/users/register
```

#### Login a registred user
```http
  GET /api/users/login
```

#### Update a user's data
```http
  PUT /api/users/:userId
```

#### Delete a specific user using his ID as parameter
```http
  DELETE /api/users/:userId
```

#### **PRODUCTS**
#### Get all products
```http
  GET /api/products
```

#### Get a specific product using his ID as parameter
```http
  GET /api/users/:productId
  ```

#### Create a new product
```http
  POST /api/products
```

#### Update a product's data
```http
  PUT /api/products/:productId
```

#### Delete a specific product using his ID as parameter
```http
  DELETE /api/products/:productId
```

#### **ORDERS**
#### Get all orders
```http
  GET /api/swapOrders
```

#### Get a order with items from the same owner and buyer
```http
  GET /api/swapOrders/order

```

#### Get orders with the same buyer and sort them
```http
  GET /api/swapOrders/userOrders  
  PARAMS {  
          buyerUserID: currentUserID,  
          filter: date or products,  
          sortOrder: 1 for ascending order  
              or -1 for descending order,  
        },
```

#### Create a new order 
```http
  POST /api/swapOrders
```

#### Update a specific order's data using his ID as parameter
```http
  PUT /api/swapOrders/:orderId
```

#### Delete a specific order using his ID as parameter
```http
  DELETE /api/swapOrders/:orderId
```



