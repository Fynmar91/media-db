const express = require("express");
const apiRouter = require("./routes");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

app.listen(process.env.PORT || 8181, () => {
  console.log(`listening on ${process.env.PORT || 8181}`);
});
