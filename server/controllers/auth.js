import UserModel from "../model/UserModel.js";
import Post from "../model/PostModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/index.js";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUsed = await UserModel.findOne({ username });
    if (isUsed) {
      return res.json({
        message: "Данный Username уже занят",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = new UserModel({
      username,
      password: hashPassword,
    });
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );
    await newUser.save();
    res.json({
      token,
      newUser,
      message: "Регистрация прошла успешно",
    });
  } catch (errors) {
    res.json({ message: "Ошибка про создании пользователя" });
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.json({
        message: "Такого юзера нету",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.json({ message: "Неверный пароль" });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );

    res.json({
      token,
      user,
      message: "Вы вошли в систему",
    });
  } catch (errors) {
    res.json({ message: "Ошибка про авторизации" });
  }
};
export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.json({
        message: "Такого юзера нету",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );

    res.json({ user, token });
  } catch (errors) {
    res.json({ message: "Нет доступа" });
  }
};