const { createServer } = require("http");
const { parse } = require("url");
const dotenv = require("dotenv");
const exp = require("constants");
const express = require("express");

dotenv.config();

let app = express();

const http = createServer(app);

process.on("SIGINT", () =>
  http.close((error) => {
    if (error) {
      console.log(`${error.name}: ${error.message}`);
    }
    process.exit(error ? 1 : 0);
  })
);

app.get("/", (_, res) => {
  res.send(`tesssssss`);
});

http.listen(process.env.PORT, () =>
  console.log(`Server init em:  ${process.env.PORT}`)
);
