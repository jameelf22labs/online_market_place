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
import { PaymentStatusEnum } from "../enums/payment.status.enum";

export default class Payments extends Model<
  InferAttributes<Payments>,
  InferCreationAttributes<Payments>
> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey()
  @Default(() => uuidv4())
  declare id: string;

  @Attribute(DataTypes.FLOAT)
  declare amount: number;

  @Attribute(DataTypes.STRING)
  @Default(() => PaymentStatusEnum.Pending)
  @Index
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
}
