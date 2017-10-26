const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

console.log(`the value of env variable is: ${JSON.stringify(process.env)}`);

app.get("/", (req, res) => {
    res.send(`<h2>Hello from Node ${process.env.NODE_ENV}</h2>`);
});

app.listen(PORT, () => {
    console.log(`sucessfully listening on port: ${PORT}`);
}); 
