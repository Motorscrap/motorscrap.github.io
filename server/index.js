const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));

// app.use(cors());
app.use(cors({ origin: process.env.ORIGIN_URL, optionsSuccessStatus: 200 }));

// Route files
const mail = require("./routes/mail");

// Mount routers
app.use("/api/v1/mail", mail);

let server = app.listen(port, console.log(`Server running on port ${port}!`));