import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import envConfig from "../../../config/env-config";
import { User } from "../models";
import Instructor from "../models/Instructor.model";
import Categories from "../models/Categories.model";
import Courses from "../models/Courses.model";
import Lectures from "../models/Lectures.model";
import Enrollments from "../models/Enrollments.model";
import Payments from "../models/Payment.model";
import Review from "../models/Review.model";

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: envConfig.Postgress.Db,
  user: envConfig.Postgress.Username,
  password: envConfig.Postgress.Password,
  host: envConfig.Postgress.Host,
  port: envConfig.Postgress.Port,
  clientMinMessages: "notice",
  models: [
    User,
    Instructor,
    Categories,
    Courses,
    Enrollments,
    Lectures,
    Payments,
    Review,
  ],
});

export default sequelize;
