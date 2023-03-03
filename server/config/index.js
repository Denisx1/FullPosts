import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const DB_USER = process.env.DB_USER
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_NAME = process.env.DB_NAME

// export const MONGO_URL = process.env.MONGO_URL;

// export const MONGO_URL2 = process.env.MONGO_URL2;

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
