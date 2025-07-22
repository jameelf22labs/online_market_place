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
  Index,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";
import { v4 as uuidv4 } from "uuid";

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
  declare userId: string;
}
