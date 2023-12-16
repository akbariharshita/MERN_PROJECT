const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');

dotenv.config({path:'./config.env'});
require("./db/conn");

app.use(cookieParser());
app.use(express.json());

app.use(require("./router/auth"));

const port = process.env.PORT;

// app.get("/about",  (req, res) => {
//     res.send("Hello About from the server");
// });

// app.get("/contact", (req, res) => {
//     res.send("Hello Contact from the server");
// });

app.get("/signup", (req, res) => {
    res.send("Hello Login from the server");
});

app.get("/signin", (req, res) => {
    res.send("Hello Registration from the server");
});

app.listen(port, () => {
    console.log(`Server is running at port no. ${port}`);
});
