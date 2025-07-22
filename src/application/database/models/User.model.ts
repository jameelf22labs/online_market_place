import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "@sequelize/core";
import { Roles } from "../enums/role.enums";
import {
  Attribute,
  Default,
  NotNull,
  PrimaryKey,
  Unique,
} from "@sequelize/core/decorators-legacy";
import { v4 as uuidv4 } from "uuid";

export default class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey()
  @Default(() => uuidv4())
  id: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  name: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  email: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  password: string;

  @Attribute(DataTypes.STRING)
  @Default(() => Roles.User)
  role: Roles;
}
