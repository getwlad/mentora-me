import jwt from "jsonwebtoken";
import { promisify } from "util";
import authConfig from "../config/auth";
import "dotenv/config";
import User from "../app/models/UserModel";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token inválido" });
  }
  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.user = decoded.id;

    const user = await User.findByPk(req.user, {
      attributes: { exclude: ["password_hash"] },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    return next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};
