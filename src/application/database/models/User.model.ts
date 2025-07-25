import { v4 as uuidv4 } from "uuid";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import { Roles } from "../enums/role.enums";
import {
  Attribute,
  Default,
  HasMany,
  HasOne,
  Index,
  NotNull,
  PrimaryKey,
  Table,
  Unique,
} from "@sequelize/core/decorators-legacy";
import Instructor from "./Instructor.model";
import Enrollments from "./Enrollments.model";
import Payments from "./Payment.model";

@Table({ tableName: "user_details" , timestamps : true })
export default class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey()
  @Default(() => uuidv4())
  declare id: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  @Index
  declare email: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare password: string;

  @Attribute(DataTypes.STRING)
  @Default(() => Roles.User)
  declare role: Roles;

  @HasOne(() => Instructor, "userId")
  declare instructure?: NonAttribute<Instructor>;

  @HasMany(() => Enrollments, "userId")
  declare enrollments?: NonAttribute<Enrollments[]>;

  @HasMany(() => Payments, "userId")
  declare payments?: NonAttribute<Payments[]>;
}
