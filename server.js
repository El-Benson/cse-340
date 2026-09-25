import "dotenv/config";
import express from "express";
import session from "express-session";

import routes from "./src/routes.js";
import flash from "./src/middleware/flash.js";
import { testConnection } from "./src/models/db.js";

const app = express();
const port = process.env.PORT || 3000;

const SESSION_SECRET =
  process.env.SESSION_SECRET || "development-session-secret";

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
  })
);

app.use(flash);

app.use(express.static("public"));

app.use("/", routes);

// 500 SERVER ERROR
app.use((error, req, res, next) => {
  console.error("Server error:", error);

  res.status(500).render("error", {
    title: "Server Error",
    message: "Something went wrong while processing your request.",
  });
});

// START SERVER
app.listen(port, async () => {
  try {
    await testConnection();

    console.log(`Server running on port ${port}`);
    console.log("Database connection successful.");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    console.log(`Server running on port ${port}`);
  }
});

console.log("CSE 340 server file has started.");
