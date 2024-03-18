# Video Sharing Example

This project is a video sharing example built using NestJS for backend and NuxtJS for frontend. It allows users to share interesting Youtube videos with others. Key features include user authentication, Youtube URL sharing and previewing. Users can also receive realtime notifications when others share videos.

## Prerequisites
- Node.js v20
- Docker (with docker compose plugin)
- MongoDB v7 (but other versions should work as well)
- Redis 7.2 (but other versions should work as well)

Actually, you don't need to install MongoDB and Redis on your local machine. We will use Docker to run them in containers. Node.js is required to run the backend and frontend applications in development mode. 

On the server, you only need to install Docker and Docker Compose to deploy the application. The application is designed to run in containers and is stateless, so it can be easily scaled horizontally.

## Installation & Configuration
1. Clone the repository and navigate to the project directory:
```bash
git clone https://github.com/minhpq331/video-sharing-example.git
cd video-sharing-example
```

2. Start local dependencies (MongoDB and Redis) using Docker:
```bash
docker compose -f docker-compose.local.yml up -d
```

MongoDB and Redis should now be running and are exposed on the following host's ports: 27017 (mongodb) and 6379 (redis). Make sure those ports are not in use by other applications.

### Run backend locally:

1. Run the following command to install the backend dependencies:
```bash
cd backend
npm install
```

2. Copy `.env.example` to `.env` and set appropriate environment variables:
```bash
cp .env.example .env
```

For a list of available environment variables, see the `.env.example` file.

3. Open 2 terminal windows to start backend API and worker:
```bash
# Terminal 1
npm run start:dev

# Terminal 2
npm run start:dev-worker
```

The backend API should now be running and is accessible at `http://localhost:3000`.

To run the test suite, use the following command:
```bash
npm run test
```

### Run frontend locally:

1. Run the following command to install the frontend dependencies:
```bash
cd frontend
npm install
```

2. Copy `.env.example` to `.env` and set appropriate environment variables:
```bash
cp .env.example .env
```

For a list of available environment variables, see the `.env.example` file.

3. Start the frontend development server:
```bash
npm run dev
```

The frontend application should now be running and is accessible at `http://localhost:8080`.

## Docker Deployment

To deploy the application using Docker, follow these steps:

1. Build the backend and frontend Docker images:
```bash
# At project root
docker build -t minhpq331/video-sharing-example-backend backend
docker build -t minhpq331/video-sharing-example-frontend frontend
```

2. Push the images to a Docker registry (e.g. Docker Hub):
```bash
docker push minhpq331/video-sharing-example-backend
docker push minhpq331/video-sharing-example-frontend
```

3. Copy `docker-compose.yml`, `nginx.conf`, and `.env.example` to server and set appropriate environment variables in `.env`:
```bash
cp .env.example .env
```

4. Start the application using Docker Compose:
```bash
docker compose up -d
```

This `docker-compose.yml` file will start nginx as the Reverse Proxy, the backend API, worker, frontend, MongoDB, and Redis. Then the application is accessible at `http://<server_ip>`. I've deploy this stack to a VPS and using Cloudflare as the CDN and DNS provider. The application is accessible at `https://frontend.toanhoczero.com`.

All the application services (backend API, worker, frontend) are stateless and can be scaled horizontally. But make sure you removed the exposed ports from the `docker-compose.yml` file and edit `nginx.conf` to load balance the requests to the backend API and frontend containers.

## Usage
1. Register an account or log in if you already have one using email and password by clicking on the `Register/Login` button.
2. After successfully logging in, you can share a video by clicking on the `Share a video` button and filling in the Youtube URL.

In the `Home` page, you can see the list of shared videos and their previews. Only latest 10 videos are displayed on this view but our API supports pagination to view older videos.

You can open an igcognito window to log in with another account and share another video. You will see a notification on the top right corner of the screen when someone shares a video. Your homepage will be updated with the new video as well.

## Troubleshooting
- If you encounter any issues with dependencies, ensure you have Node.js 20 installed and npm dependencies are properly installed by running `npm install`.
- If any of the Docker containers fail to start, check if the following ports are in use by other applications: 3000 (backend), 8080 (frontend), 27017 (mongodb), and 6379 (redis). Also, ensure you have enough permissions to start Docker containers.
- When running the application locally, ensure you have the correct environment variables set in `.env` files. The default `.env.example` should work without any modification.
- When setting up mongodb connection string with username and password, one common mistake is missing the authSource parameter. If you encounter any issues with MongoDB connection, check that first.
- You can use your own MongoDB and Redis instances by setting the appropriate environment variables in `.env` files. Just make sure the connection strings are correct and accessible from the backend API and worker. Also comment out the `mongodb` and `redis` services in `docker-compose.yml` file.