import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import {
  CreateInstructorPayloadDto,
  LoginPayloadDto,
  SignUpPayloadDto,
} from "../../common/dto";
import { UserQueryHelper } from "../../database/helpers";
import { User } from "../../database/models";
import { BadRequestError, UnAuthorizedError } from "../../errors";
import { Roles } from "../../database/enums/role.enums";
import JwtUtils from "../../common/utils/jwt.utils";
import Instructor from "../../database/models/Instructor.model";

const AuthService = {
  register: async (
    user: SignUpPayloadDto
  ): Promise<{
    name: string;
    email: string;
  }> => {
    const existUser = await UserQueryHelper.findOne({ email: user.email });

    if (existUser) {
      throw new BadRequestError(" User Already Register ");
    }

    const createdUser = await User.create({
      ...user,
      password: `${bcrypt.hashSync(user.password, 10)}`,
      id: uuidv4(),
      role: Roles.User,
    });

    return {
      name: createdUser.name,
      email: createdUser.email,
    };
  },

  login: async (
    user: LoginPayloadDto
  ): Promise<{
    accessToken: string;
    user: LoginPayloadDto;
  }> => {
    const existUser = await UserQueryHelper.findOne({ email: user.email });

    if (!existUser) {
      throw new UnAuthorizedError(" Given Credentiols are Invalid ");
    }

    const isValidPassword = await bcrypt.compare(
      user.password,
      existUser.password
    );

    if (!isValidPassword) {
      throw new UnAuthorizedError(" Given Password is Incorrect ");
    }

    const accessToken = JwtUtils.generateToken({
      name: existUser.name,
      email: existUser.email,
      role: existUser.role,
      id: existUser.id,
    });

    return {
      accessToken,
      user,
    };
  },

  createInstrutorAccount: async (instructor: CreateInstructorPayloadDto) => {
    const createdInstructor = await Instructor.create({ ...instructor });

    await User.update(
      { role: Roles.Instructor },
      { where: { id: instructor.userId } }
    );

    return {
      id: createdInstructor.id,
    };
  },
};

export default AuthService;
