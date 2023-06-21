import { Response } from "express";

export const respond = (
  res: Response,
  code: number,
  status: string,
  message: string,
  data?: any
) => {
  if (code === 200 || code === 201) {
    return res
      .status(code)
      .json({ status: status, message: message, data: data || [] });
  } else {
    return res.status(code).json({ status: status, error: message });
  }
};
