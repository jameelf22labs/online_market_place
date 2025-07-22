import { v4 as uuidv4 } from "uuid";

import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "@sequelize/core";
import {
  Attribute,
  ColumnName,
  Default,
  HasOne,
  Index,
  NotNull,
  PrimaryKey,
} from "@sequelize/core/decorators-legacy";
import { EnrollmentsStatusEnum } from "../enums/enrollement.status.enum";
import { NonAttribute } from "sequelize";
import Review from "./Review.model";

export default class Enrollments extends Model<
  InferAttributes<Enrollments>,
  InferCreationAttributes<Enrollments>
> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey()
  @Default(() => uuidv4())
  declare id: string;

  @Attribute(DataTypes.STRING)
  @Default(() => EnrollmentsStatusEnum.InProgress)
  declare status: string;

  @Attribute(DataTypes.UUID)
  @Index
  @NotNull
  @ColumnName("user_id")
  declare userId: string;

  @Attribute(DataTypes.UUID)
  @Index
  @NotNull
  @ColumnName("course_id")
  declare courseId: string;

  @HasOne(() => Review, "enrollmentId")
  declare reviews?: NonAttribute<Review>;
}
