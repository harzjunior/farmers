const express = require("express");
const bodyParser = require("body-parser");
const farmersRoutes = require("./routes/farmersRoutes");
const farmsRoutes = require("./routes/farmsRoutes");
const cropsRoutes = require("./routes/cropsRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const pestsRoutes = require("./routes/pestsRoutes");
const tasksRoutes = require("./routes/tasksRoutes");
const connectDB = require("./config/db");
const PORT = require("./config/port");
const path = require("path");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandling");

const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine
// app.set("view engine", "ejs");
// app.set("views", __dirname + "/views");

// Routes
app.use("/farmers", farmersRoutes);
app.use("/farms", farmsRoutes);
app.use("/crops", cropsRoutes);
app.use("/weather", weatherRoutes);
app.use("/pests", pestsRoutes);
app.use("/tasks", tasksRoutes);

// Route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Error handling middleware (must be defined last)
app.use(errorHandler);

// Connect to MongoDB
connectDB()
  .then(() => {
    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
