import Joi from "joi";

interface IBody {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  gender: string;
  location?: string;
  education?: string;
  study?: string;
}
export const createUserValidate = (data: IBody) => {
  const schema = Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    gender: Joi.string().required(),
    location: Joi.string(),
    education: Joi.string(),
    study: Joi.string(),
  });

  const value = schema.validate(data, { abortEarly: false });
  return value;
};
export const updateUserValidate = (data: IBody) => {
  const schema = Joi.object().keys({
    firstname: Joi.string(),
    lastname: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    gender: Joi.string(),
    location: Joi,
    education: Joi,
    study: Joi.string(),
  });

  const value = schema.validate(data, { abortEarly: false });
  return value;
};
