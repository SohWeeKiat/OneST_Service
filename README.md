# OneST 

## Architecture
1. Frontend - Developed using ``NextJS`` with Shadcn UI
- Hosted on port 3000
2. Backend - Developed using ``NestJS``
- Hosted on port 3001

## How to use

### Running / deploy to docker
1. Download or git clone the project
2. Ensure [**docker desktop**](https://www.docker.com/products/docker-desktop/) is running
3. Run the following command to start docker deployment **``docker compose up -d``**
4. Visit http://localhost:3000/ on browser

### Running locally in dev mode on Windows
1. Download or git clone the project
2. Ensure that you have at least [**``nodejs v24``**](https://nodejs.org/en/download) installed
3. Run **``npm install``** in root directory
4. Build supporting packages first, by executing **``npm run build:packages``** in root directory
5. Start both backend and frontend projects by executing **``npm run dev``** in root directory
6. Visit http://localhost:3000/ on browser
