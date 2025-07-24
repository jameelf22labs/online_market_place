import { v4 } from "uuid";
import Joi from "joi";
import Categories from "../../database/models/Categories.model";
import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../../common/interface/AuthenticateRequest";
import { BadRequestError } from "../../errors";
import ApiResponse from "../../common/utils/ApiSucessResponse";

const CategorieHandler = {
  addCategorie: async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const validate = await Joi.object({
        name: Joi.string().required(),
        slug: Joi.string().required(),
      }).validateAsync(request.body);

      if (validate?.error) {
        throw new BadRequestError(validate?.error);
      }

      const categorie = await Categories.findOne({ where: {name : request.body.name }  });

      if (categorie) {
        throw new BadRequestError(`${request.body.name} already exist.`);
      }

      const createdCategori = await Categories.create({
        name: request.body.name,
        slug: request.body.slug,
        id: v4(),
      });

      return new ApiResponse(response)
        .setStatus(true)
        .setMessage("New Category Added")
        .setData({
          id: createdCategori.id,
          name: createdCategori.name,
          slug: createdCategori.slug,
        })
        .send(201);
    } catch (error) {
      next(error);
    }
  },

  getAllCategories: async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const categories = await Categories.findAll();
      return new ApiResponse(response)
        .setStatus(true)
        .setMessage(categories ? "Listed All Categorie" : "No Categories")
        .setData(categories)
        .send(categories ? 200 : 204);
    } catch (error) {
      next(error);
    }
  },
};

export default CategorieHandler;
