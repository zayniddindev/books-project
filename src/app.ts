import express, { Application } from "express";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import mysql2 from "mysql2";
import helmet from "helmet";
import Controller from "./utils/interfaces/controller.interface";
import ErrorMiddleware from "./middleware/error.middleware";

export default class App {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    this.createDatabaseConnection();
    this.initializeMiddleware();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initializeMiddleware(): void {
    this.express.use(helmet());
    this.express.use(morgan("dev"));
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use("/", controller.router);
    });
  }

  private initializeErrorHandling(): void {
    this.express.use(ErrorMiddleware);
  }

  private createDatabaseConnection(): void {
    const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;
    mysql2.createConnection({
          host: DB_HOST,
          user: DB_USERNAME,
          database: DB_NAME,
          password: DB_PASSWORD,
      });
  }

  public listen(){
      this.express.listen(this.port, ()=> {
          console.log(`Listening on port ${this.port}`);
          
      })
  }
}
