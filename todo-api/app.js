import cors from "cors";
import express from "express";

import dbConnect from "./db.connect.js";
import todoRoutes from "./modules/todo/todo.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import refreshTokenRoutes from "./modules/refresh-token/refresh.token.routes.js";

const app = express();
app.use(express.json());
app.use(cors());

// connect db
await dbConnect();

// register routes
app.use("/todo", todoRoutes);

app.use("/user", userRoutes);

app.use("/refresh-token", refreshTokenRoutes);

// error handling
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500);
  res.send({ message: err.message });
});

export default app;
