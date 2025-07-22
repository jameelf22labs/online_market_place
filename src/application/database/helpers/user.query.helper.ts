import { User } from "../models";

const UserQueryHelper = {
  findOne: (whereContion: Record<string, any>): Promise<User | null> => {
    return User.findOne({ where: whereContion });
  },

};

export default UserQueryHelper;
