const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const checkoutRoutes = require("./routes/checkOutRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");
const subscribeRoutes = require("./routes/subsribeRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const adminOrderRoutes = require("./routes/adminOrderRoutes.js");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 9000 || 9001;

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:3000",
      "https://ecommerce-project-five-tau.vercel.app", // <-- Add this line
      "http://suvarnarup-ecommerce.imcc.com",
      
    ],
    credentials: true,
  })
);

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscribeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
// Register admin order routes
app.use("/api/admin", adminOrderRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to SuvarnaRup");
});

// ✅ Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
