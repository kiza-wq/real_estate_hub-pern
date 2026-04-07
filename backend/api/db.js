import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const config = {
  user: process.env.USER,
  host: process.env.HOST, // or the service name in docker-compose, e.g., 'postgres_db'
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
};

const supabase_pool = new Pool(config);

const pool_mw = (req, res, next) => {
  req.pool = supabase_pool;
  next();
};

export { config, pool_mw };
