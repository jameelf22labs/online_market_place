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
  Unique,
} from "@sequelize/core/decorators-legacy";

export default class Review extends Model<
  InferAttributes<Review>,
  InferCreationAttributes<Review>
> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey()
  @Default(() => uuidv4())
  declare id: string;

  @Attribute(DataTypes.INTEGER)
  @Default(() => 0)
  declare rating: number;

  @Attribute(DataTypes.TEXT)
  declare comment: string;

  @Attribute(DataTypes.UUID)
  @NotNull
  @Index
  @ColumnName("enrollement_id")
  @Unique
  declare enrollmentId: string;
}
