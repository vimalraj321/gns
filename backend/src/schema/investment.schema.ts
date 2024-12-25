import Joi from "joi";

export class InvestmentSchema {
  static createInvestment = Joi.object({
    amount: Joi.number().required(),
    wallet: Joi.string().required(),
  });

  static withdraw = Joi.object({
    amount: Joi.number().required(),
  });

  static withdrawalRequest = Joi.object({
    amount: Joi.number().required(),
  });

  static updateWithdrawal = Joi.object({
    status: Joi.string().valid("approved", "rejected").required(),
  });

  // static loginUser = Joi.object({
  //   wallet: Joi.string().required(),
  //   email: Joi.string().email().required(),
  // });
}
