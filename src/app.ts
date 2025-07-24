import express from "express";
import sequelize from "./application/database/config/sequalize-database";
import importRoutes from "./application/module";
import globalErrorMiddleware from "./application/middleare/global.error.middleware";
import multer from "multer";
import cors from "cors";
import storage from "./config/storage-config";

const allowedOrigins = ["http://localhost:5173"];

const application = async () => {
  try {
    const app = express();

    app.use(
      cors({
        origin: allowedOrigins,
        credentials: true,
      })
    );
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const upload = multer({ storage: storage });

    app.use((req, res, next) => {
      const time = new Date(Date.now()).toString();
      console.log(req.method, req.hostname, req.path, time);
      next();
    });

    app.get("/", (_req, res) => {
      res.status(200).json({
        message: "Hello World",
      });
    });

    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Sequelize with Postgres Connected");

    const router = importRoutes(upload);
    app.use("/api/v1", router);
    app.use(globalErrorMiddleware);

    return app;
  } catch (error) {
    throw error;
  }
};

export default application;
