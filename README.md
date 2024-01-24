Link to frontend: [https://marketplace-hcv1.onrender.com/](https://marketplace-hcv1.onrender.com/)

Link to backend: [https://marketplace-api-bb3o.onrender.com/](https://marketplace-api-bb3o.onrender.com/)
  

# Backend Installation

Install dependencies in the backend folder with command:

````
npm install
````

create .env file in the backend folder with values:

````
MYSQL_HOST='localhost'
MYSQL_USERNAME='root'
MYSQL_PASSWORD='example'
MYSQL_DATABASE='example_db'
JWT_KEY = 'dev_key'
````

to run the database in docker container run the following command in the root directory of the project:

````
docker compose up -d
````

to start webserver run following command in the backend folder:

````
npm run dev
````

  

# Endpoints

**Items:**
````
Get all items (GET)
http://localhost:5000/api/items

Get item by ID (GET)
http://localhost:5000/api/items/:id

Get items by owner Id (GET)
http://localhost:5000/api/items/owner/:id

Create an item (POST)
http://localhost:5000/api/items/:id

Delete item by ID (DELETE)
http://localhost:5000/api/items/:id

Edit item by ID (PUT)
http://localhost:5000/api/items/:id
````

**Users:**
````
Get all users (GET)
http://localhost:5000/api/users

Get user by ID (GET)
http://localhost:5000/api/users/:id

Signup user (POST)
http://localhost:5000/api/users/signup

Login user (POST)
http://localhost:5000/api/users/login
````

**Screenshots**

<div align="center">
    <p>Get items</p>
    <img src="/screenshots/get_items.png" width="600px"</img>
    <p>Get item by Id</p>
    <img src="/screenshots/get_item_by_id.png" width="600px"</img>
    <p>Get items by owner Id</p>
    <img src="/screenshots/get_items_by_ownerID.png" width="600px"</img>
    <p>Create item</p>
    <img src="/screenshots/create_item.png" width="600px"</img>
    <p>Delete item</p>
    <img src="/screenshots/delete_item.png" width="600px"</img>
    <p>Update item</p>
    <img src="/screenshots/update_item.png" width="600px"</img>
    <p>Get users</p>
    <img src="/screenshots/get_users.png" width="600px"</img>
    <p>Get user by Id</p>
    <img src="/screenshots/get_user_by_id.png" width="600px"</img>
    <p>Signup user</p>
    <img src="/screenshots/user_signup.png" width="600px"</img>
    <p>Login user</p>
    <img src="/screenshots/user_login.png" width="600px"</img>
</div>

# Frontend installation

Install dependencies in the frontend folder with command:

````
npm install
````
create .env file in the frontend folder with value:
````
VITE_API_URL=http://localhost:5000
````
to start the frontend run the following command (database and backend must be on for full functionality):
````
npm run dev
````

# Frontend screenshots

<div align="center">
    <p>Login</p>
    <img src="/screenshots/login_page.png" width="600px"</img>
    <p>Signup</p>
    <img src="/screenshots/signup_page.png" width="600px"</img>
    <p>Items list</p>
    <img src="/screenshots/home_page.png" width="600px"</img>
    <p>Create item</p>
    <img src="/screenshots/create_item_page.png" width="600px"</img>
    <p>Items listed by the user</p>
    <img src="/screenshots/own_items_page.png" width="600px"</img>
    <p>Edit item modal</p>
    <img src="/screenshots/edit_item.png" width="600px"</img>
    <p>Delete item modal</p>
    <img src="/screenshots/delete_item_modal.png" width="600px"</img>
</div>
