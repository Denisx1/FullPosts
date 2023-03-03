import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/index.js";

export const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET_KEY);
      req.userId = decoded.id;
      next();
    } catch (error) {
      return res.json({ message: "Нет доступа" });
    }
  } else {
    return res.json({ message: "Нет доступа" });
  }
};
