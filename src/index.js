const express = require("express");
const app = express();
const port = 3000;
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes/auth");
const UserRoute = require("./routes/user");

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", UserRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
