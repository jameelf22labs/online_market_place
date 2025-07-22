import express from "express";
import sequelize from "./application/database/config/sequalize-database";
import importRoutes from "./application/module";
import globalErrorMiddleware from "./application/middleare/global.error.middleware";

const application = async () => {
  try {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

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

    const router = importRoutes();
    app.use("/api/v1", router);
    app.use(globalErrorMiddleware);
    
    return app;
  } catch (error) {
    throw error;
  }
};

export default application;
