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
  HasOne,
  Index,
  NotNull,
  PrimaryKey,
  Unique,
} from "@sequelize/core/decorators-legacy";
import { v4 as uuidv4 } from "uuid";
import Instructor from "./Instructor.model";

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
}
