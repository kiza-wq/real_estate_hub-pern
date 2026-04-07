import express from "express";
import cookieParser from "cookie-parser";
import { Client } from "pg";
import { config, pool_mw } from "./db.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";

async function checkPostgresConnection() {
  const client = new Client(config);
  try {
    await client.connect();
    console.log("PostgreSQL container is running and connected successfully!");
    await client.query("SELECT 1"); // A basic query to verify readiness
    console.log("PostgreSQL is ready to accept queries.");
    await client.end();
    return true;
  } catch (err) {
    console.error("Failed to connect to PostgreSQL:", err.message);
    return false;
  }
}

checkPostgresConnection();

const app = express();

app.use(express.json());

app.use(cookieParser());

// mount postgres Pool on every middleware
app.use(pool_mw);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
