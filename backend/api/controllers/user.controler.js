import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
  if (req.user.id != req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));
  console.log(req.params);
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const Query =
      "UPDATE users SET username = $1, email = $2, password = $3, avatar = $4, updated_at = $5 WHERE id = $6 RETURNING *";
    const Values = [
      req.body.username,
      req.body.email,
      req.body.password,
      req.body.avatar,
      new Date(),
      req.user.id,
    ];
    const updatedUser = await req.pool.query(Query, Values);

    const { password, ...rest } = updatedUser.rows[0];

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id != req.params.id)
    return next(errorHandler(401, "You can only delete your own account!"));

  try {
    await req.pool.query("DELETE FROM users WHERE id = $1", [req.user.id]);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user.id == req.params.id) {
    try {
      const listings = await req.pool.query(
        "SELECT * FROM listings WHERE user_id = $1",
        [req.user.id],
      );
      res.status(200).json(listings.rows);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listings!"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const Query = "SELECT * FROM users WHERE id = $1";
    const Values = [req.params.id];
    const user = await req.pool.query(Query, Values);

    if (!user) return next(errorHandler(404, "User not found!"));

    const { password: pass, ...rest } = user.rows[0];

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
