import { v4 as uuidv4 } from "uuid";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "@sequelize/core";
import {
  Attribute,
  Default,
  HasMany,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";
import { NonAttribute } from "sequelize";
import Courses from "./Courses.model";

@Table({ tableName: "categorie_details" , timestamps : true })
export default class Categories extends Model<
  InferAttributes<Categories>,
  InferCreationAttributes<Categories>
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
  declare slug: string;

  @HasMany(() => Courses, "categoryId")
  declare courses?: NonAttribute<Courses[]>;
}
