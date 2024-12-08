const express = require("express");
const app = express();
const port = 3000;
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes/auth");
const UserRoute = require("./routes/user");
const verifyToken = require("./middleware/authMiddleware");

app.use(express.json());
app.use(verifyToken);
app.use("/api/auth", authRoutes);
app.use("/api/users", UserRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
