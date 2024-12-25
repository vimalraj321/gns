import Joi from "joi";

export class GameSchema {
  static createGame = Joi.object({
    email: Joi.string().email().required(),
    amount: Joi.number().required(),
    gameName: Joi.string().required(),
    gameCategory: Joi.string().required(),
    verifyToken: Joi.string().required(),
  });
}
