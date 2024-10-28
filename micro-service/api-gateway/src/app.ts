import express, { Request, Response } from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const port = process.env.PORT || 3000;

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Proxy requests to the User Service
app.use('/users', createProxyMiddleware({
  target: 'http://user-service:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/users': '', // Remove /users from the path
  },
}));

// Proxy requests to the Time Service
app.use('/time', createProxyMiddleware({
  target: 'http://time-service:3002',
  changeOrigin: true,
  pathRewrite: {
    '^/time': '', // Remove /time from the path
  },
}));

// Simple route to test the API Gateway
app.get("/", (req: Request, res: Response) => {
  res.send("API Gateway is running");
});

// Start the server
app.listen(port, () => {
  console.log(`API Gateway started on http://localhost:${port}`);
});