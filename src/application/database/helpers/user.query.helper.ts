import { User } from "../models";
import Instructor from "../models/Instructor.model";

const UserQueryHelper = {
  findOne: (whereContion: Record<string, any>): Promise<User | null> => {
    return User.findOne({
      where: whereContion,
      include: [{ model: Instructor }],
    });
  },
};

export default UserQueryHelper;
