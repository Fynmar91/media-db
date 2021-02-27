const express = require("express");
const apiRouter = require("./routes");
const cors = require("cors");
const bp = require("body-parser");

const app = express();
app.use(cors());
app.options("*", cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use("/api", apiRouter);

app.listen(process.env.PORT || 8181, () => {
  console.log(`listening on ${process.env.PORT || 8181}`);
});
