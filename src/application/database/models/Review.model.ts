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
  Table,
  Unique,
} from "@sequelize/core/decorators-legacy";

@Table({ tableName: "review_details" , timestamps : true })
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

  @Attribute(DataTypes.UUID)
  @NotNull
  @Index
  @ColumnName("course_id")
  declare courseId: string;
}
