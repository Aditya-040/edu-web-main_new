Create a folder with two subfolders: client (React frontend) and server (Node + Express backend).

In the server folder, run npm init -y and install express, mongoose, cors, and dotenv.

Set up basic Express server and connect it to MongoDB using Mongoose.

In the client folder, run npx create-react-app . to set up the React app.

Build your frontend and connect it to the backend using axios and the backend URL.

Push the server folder to GitHub.

Go to render.com, connect your GitHub, and deploy the backend as a web service.

Add environment variables like PORT, MONGO_URI on Render.

Copy the Render backend URL once deployed.

Push the client folder to GitHub.

Go to vercel.com, import your frontend GitHub repo, and set the root directory as client.

Add the Render backend URL as an environment variable if needed.

Click "Deploy" on Vercel.

Test the live frontend and check if it talks to the backend.

Done! Your MERN app is now live with frontend on Vercel and backend on Render.
