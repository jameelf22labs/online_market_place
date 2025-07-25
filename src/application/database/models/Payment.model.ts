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
} from "@sequelize/core/decorators-legacy";
import {
  PaymentMethodEnum,
  PaymentStatusEnum,
} from "../enums/payment.status.enum";

@Table({ tableName: "payment_details" , timestamps : true })
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

  @Attribute(DataTypes.STRING)
  @Default(() => PaymentMethodEnum.CreditCard)
  @ColumnName('payment_method')
  declare paymentMethod: string;

  @Attribute(DataTypes.STRING)
  declare cardNumber?: string;

  @Attribute(DataTypes.STRING)
  declare cardName?: string;

  @Attribute(DataTypes.STRING)
  declare address?: string;

  @Attribute(DataTypes.STRING)
  declare state?: string;

  @Attribute(DataTypes.STRING)
  declare country?: string;

  @Attribute(DataTypes.INTEGER)
  @ColumnName("postal_code")
  declare postalCode?: number;

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
