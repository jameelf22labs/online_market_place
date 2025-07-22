import { v4 as uuidv4 } from "uuid";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import {
  Attribute,
  ColumnName,
  Default,
  HasMany,
  Index,
  NotNull,
  PrimaryKey,
} from "@sequelize/core/decorators-legacy";
import Lectures from "./Lectures.model";
import Enrollments from "./Enrollments.model";
import Payments from "./Payment.model";

export default class Courses extends Model<
  InferAttributes<Courses>,
  InferCreationAttributes<Courses>
> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey()
  @Default(() => uuidv4())
  declare id: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare title: string;

  @Attribute(DataTypes.TEXT)
  declare description: string;

  @Attribute(DataTypes.FLOAT)
  declare price: number;

  @Attribute(DataTypes.STRING)
  @ColumnName("thumbnil_url")
  declare thumbnilUrl: string;

  @Attribute(DataTypes.UUID)
  @NotNull
  @Index
  @ColumnName("instructor_id")
  declare instructorId: string;

  @Attribute(DataTypes.UUID)
  @NotNull
  @Index
  @ColumnName("category_id")
  declare categoryId: string;

  @HasMany(() => Lectures, "courseId")
  declare lectures?: NonAttribute<Lectures[]>;

  @HasMany(() => Enrollments, "courseId")
  declare enrollments?: NonAttribute<Enrollments[]>;

  @HasMany(() => Payments, "courseId")
  declare payments?: NonAttribute<Payments[]>;
}
