import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "@sequelize/core";
import {
  Attribute,
  Column,
  ColumnName,
  Default,
  HasMany,
  Index,
  NotNull,
  PrimaryKey,
  Table,
  Unique,
} from "@sequelize/core/decorators-legacy";
import { NonAttribute } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Courses from "./Courses.model";

@Table({ tableName: "instructor_details" })
export default class Instructor extends Model<
  InferAttributes<Instructor>,
  InferCreationAttributes<Instructor>
> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey()
  @Default(() => uuidv4())
  declare id: string;

  @Attribute(DataTypes.TEXT)
  @NotNull
  declare bio: string;

  @Attribute(DataTypes.STRING)
  @ColumnName("profile_picture_url")
  declare profilePicUrl: string;

  @Attribute(DataTypes.STRING)
  declare expertise: string;

  @Attribute(DataTypes.UUID)
  @ColumnName("user_id")
  @NotNull
  @Index
  @Unique
  declare userId: string;

  @HasMany(() => Courses, "instructorId")
  declare courses?: NonAttribute<Courses[]>;
}
