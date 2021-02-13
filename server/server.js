const express = require("express");
const apiRouter = require("./routes");

const app = express();

app.use(express.json());

app.use("/api/media", apiRouter);

app.listen(process.env.PORT || 8181, () => {
  console.log(`listening on ${process.env.PORT || 8181}`);
});
