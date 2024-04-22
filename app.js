require("dotenv").config()
require("express-async-errors"); //async error

const express = require("express");
const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products")

// middle ware

app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>Store Api</h1><a href='/api/v1/products'>Products</a>");
});

app.use("/api/v1/products", productsRouter);

//product route

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3001;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log("server is listen", port));
    } catch (err) {
        console.log(err);
    }
}

start();