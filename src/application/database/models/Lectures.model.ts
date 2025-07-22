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
  Index,
  NotNull,
  PrimaryKey,
} from "@sequelize/core/decorators-legacy";

export default class Lectures extends Model<
  InferAttributes<Lectures>,
  InferCreationAttributes<Lectures>
> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey()
  @Default(() => uuidv4())
  declare id: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare title: string;

  @Attribute(DataTypes.STRING)
  declare videoUrl: string;

  @Attribute(DataTypes.FLOAT)
  declare duration: number;

  @Attribute(DataTypes.UUID)
  @NotNull
  @Index
  @ColumnName("course_id")
  declare courseId: string;
}
