const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send(`Hello from Node v${process.env.NODE_ENV}`);
});

app.listen(PORT, () => {
    console.log(`sucessfully listening on port: ${PORT}`);
}); 
