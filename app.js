require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

const authRouter = require("./routes/authRoutes");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());

app.get('/api/v1',(req,res) => {
    console.log(req.cookies)
    res.send('e-commerce api')
})


app.get("/", (req, res) => {
  console.log(req.cookies);
  res.send("e-commerce api");
});

app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandler);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
