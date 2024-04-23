import express, { Application, Request, Response } from "express";
import cors from "cors";

import http, { get } from "http";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { config } from "dotenv";
import UserRoute from "./routes/UserRoute";
import BlogRoute from "./routes/BlogRoute";
config();

const app: Application = express();
const server = http.createServer(app);

import "./config/configure";
import MessageRoute from "./routes/MessageRoute";

app.use(express.json());

app.use(
  cors()
);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Brand",
      version: "1.0.0",
      description: "my brand API documentation",
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};
const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", UserRoute);
app.use("/blog", BlogRoute);
app.use("/message", MessageRoute);

app.listen(4000, () => {
  console.log(`Server Start on Port 4000`);
});
