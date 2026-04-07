import { errorHandler } from "../utils/error.js";

const createTableQueryy = `CREATE TABLE IF NOT EXISTS listings(id SERIAL PRIMARY KEY, user_id INT4 REFERENCES users(id) ,
name TEXT NOT NULL, description TEXT NOT NULL, address TEXT NOT NULL, regular_price FLOAT4 NOT NULL, discount_price FLOAT4 NOT NULL,
bathrooms INT2, bedrooms INT2, furnished BOOLEAN, parking BOOLEAN, type TEXT NOT NULL, offer BOOLEAN, image_urls TEXT[] NOT NULL,created_at TIMESTAMPTZ,
                          updated_at TIMESTAMPTZ )`;

export const createListing = async (req, res, next) => {
  const Query = `INSERT INTO listings (user_id,
    name,
    description,
    address,
    regular_price,
    discount_price,
    bathrooms,
    bedrooms,
    furnished,
    parking,
    type,
    offer,
    image_urls,
    created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`;
  const Values = [
    req.body.user_id,
    req.body.name,
    req.body.description,
    req.body.address,
    req.body.regular_price,
    req.body.discount_price,
    req.body.bathrooms,
    req.body.bedrooms,
    req.body.furnished,
    req.body.parking,
    req.body.type,
    req.body.offer,
    req.body.image_urls,
    req.body.created_at,
  ];
  try {
    await req.pool.query(createTableQueryy);
    const result = await req.pool.query(Query, Values);
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await req.pool.query("SELECT * FROM listings WHERE id = $1", [
    req.params.id,
  ]);

  if (!listing.rows[0]) {
    return next(errorHandler(404, "Listing not found!"));
  }

  if (req.user.id != listing.rows[0].user_id) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }

  try {
    await req.pool.query("DELETE FROM listings WHERE id = $1", [req.params.id]);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await req.pool.query("SELECT * FROM listings WHERE id = $1", [
    req.params.id,
  ]);
  if (!listing.rows[0]) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (req.user.id !== listing.rows[0].user_id) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }

  try {
    const Query = `UPDATE listings SET name = $1, description = $2, address = $3, regular_price = $4, discount_price = $5, bathrooms = $6,
    bedrooms = $7, furnished = $8, parking = $9, type = $10, offer = $11, image_urls = $12, updated_at = $13 WHERE id = $14 RETURNING *`;
    const Values = [
      req.body.name,
      req.body.description,
      req.body.address,
      req.body.regular_price,
      req.body.discount_price,
      req.body.bathrooms,
      req.body.bedrooms,
      req.body.furnished,
      req.body.parking,
      req.body.type,
      req.body.offer,
      req.body.image_urls,
      req.body.updated_at,
      req.params.id,
    ];
    const updatedListing = await req.pool.query(Query, Values);
    res.status(200).json(updatedListing.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await req.pool.query(
      "SELECT * FROM listings WHERE id = $1",
      [req.params.id],
    );
    if (!listing.rows[0]) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const offer = req.query.offer;
    const furnished = req.query.furnished;
    const parking = req.query.parking;
    const type = req.query.type;
    const searchTerm = req.query.searchTerm ? `%${req.query.searchTerm}%` : "%";
    const sort = req.query.sort == "created_at" ? "created_at" : "regular_price";
    const order = req.query.order == "DESC" ? "DESC" : "ASC";

    const Query = `SELECT * FROM listings WHERE name LIKE $1 AND offer = COALESCE($2, offer) AND furnished = COALESCE($3, furnished) 
    AND parking = COALESCE($4, parking) AND type = COALESCE($5, type) ORDER BY ${sort} ${order} LIMIT $6 OFFSET $7`;
    const Values = [
      searchTerm,
      offer,
      furnished,
      parking,
      type,
      limit,
      startIndex,
    ];

    const listings = await req.pool.query(Query, Values);

    return res.status(200).json(listings.rows);
  } catch (error) {
    next(error);
  }
};
