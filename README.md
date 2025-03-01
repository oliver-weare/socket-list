# Prerequisites

**Node.js Environment**

- **Node.js (v16+):** The runtime environment for executing JavaScript code server-side
- **npm or yarn:** Package manager for installing dependencies

**Development Tools**

- **Vite:** Frontend build tool and development server that provides fast HMR (Hot Module Replacement)
- **Express:** Web application framework for Node.js to build the backend server
- **WebSockets:** Protocol for real-time bidirectional communication between client and server
- **MongoDB:** NoSQL database for storing application data
- **Bootstrap:** CSS framework for responsive and mobile-first front-end development

**Database Setup**

- **MongoDB Atlas account** or local MongoDB installation
- **MongoDB connection string** for connecting your application to the database

**Additional Dependencies**

- **mongoose:** MongoDB object modelling tool for Node.js
- **socket.io:** Library for WebSocket implementation
- **dotenv:** Module for loading environment variables from a .env file
- **cors:** Middleware for enabling CORS in Express

**Basic Knowledge Requirements**

- **JavaScript/ES6+:** Core programming language
- **HTML/CSS:** For frontend development
- **RESTful API concepts:** For designing server endpoints
- **Asynchronous programming:** For handling WebSocket connections

# Setup

Follow these steps to set up the project:

**1. Clone the Repository**

```bash
git clone https://github.com/oliver-weare/socket-list
cd socket-list
```

**2. Client Setup**

```bash
cd client
npm install
```

Copy the sample environment file and configure it:

```bash
cp sample.env .env
```

Edit the .env file with your configuration:

```jsx
VITE_API_URL=url-to-api
```

**3. Server Setup**

```bash
cd ../server
npm install
```

Copy the sample environment file and configure it:

```bash
cp sample.env .env
```

Edit the .env file with your configuration:

```jsx
PORT=chosen-port
MONGO_URI=your-db
JWT_SECRET=some-key
```

**4. Run the Application**

Start both the client and server with a single command:

```bash
./start.sh
```

The application should now be running at [http://localhost:5173](http://localhost:5173) with the server at the designated port on localhost.