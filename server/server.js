const express = require("express");
const apiRouter = require("./routes");
const cors = require("cors");
const bp = require("body-parser");

const app = express();
cors({ credentials: true, origin: true });
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", apiRouter);

app.listen(process.env.PORT || 8181, () => {
  console.log(`listening on ${process.env.PORT || 8181}`);
});
