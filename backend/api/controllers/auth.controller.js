import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

const createTableQuery = `CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY,
                          username TEXT UNIQUE NOT NULL,
                          email TEXT UNIQUE NOT NULL,
                          password TEXT NOT NULL,
                          avatar TEXT,
                          created_at TIMESTAMPTZ,
                          updated_at TIMESTAMPTZ )`;

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const Query =
    "INSERT INTO users(username, email, password, created_at) VALUES($1, $2, $3, $4)";
  const Values = [username, email, hashedPassword, new Date()];
  try {
    await req.pool.query(createTableQuery);
    await req.pool.query(Query, Values);
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const Query = "SELECT * FROM users WHERE email = $1";
    const result = await req.pool.query(Query, [email]);
    const validUser = result.rows[0];
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const email = req.body.email;
    const Query = "SELECT * FROM users WHERE email = $1";
    const result = await req.pool.query(Query, [email]);
    const user = result.rows[0];
    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const username =
        req.body.name.split(" ").join("_") +
        "_OAuth_" +
        Math.random().toString(36).slice(-4);
      const avatar = req.body.photo;
      const Query =
        "INSERT INTO users(username, email, password,avatar,created_at) VALUES($1, $2, $3, $4, $5) RETURNING *";
      const Values = [username, email, hashedPassword, avatar, new Date()];
      await req.pool.query(createTableQuery);
      const result = await req.pool.query(Query, Values);
      const newUser = result.rows[0];
      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {}
};
