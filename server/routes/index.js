const express = require("express");
const db = require("../db");
const router = express.Router();

//Media
//select all
router.get("/media/", async (req, res) => {
  try {
    let results = await db.getAll();
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//select by type
router.get("/media/type/:type", async (req, res) => {
  try {
    let results = await db.getAllByType(req.params.type);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//select one
router.get("/media/:id", async (req, res) => {
  try {
    let results = await db.getOne(req.params.id);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//update
router.put("/media/update/:id", async (req, res) => {
  try {
    let results = await db.one(req.params.id);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//delete
router.delete("/media/delete/:id", async (req, res) => {
  try {
    await db.delete(req.params.id);
    let hist = await db.getAllHist(req.params.id);
    for (const iterator of hist) {
      await db.deleteHist(iterator.history_id);
    }
    let prop = await db.getAllProps(req.params.id);
    for (const iterator of prop) {
      await db.deleteProp(iterator.history_id);
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//insert
router.post("/media/insert/", async (req, res) => {
  try {
    let media = [];
    media[0] = req.body.name;
    media[1] = req.body.altname;
    media[2] = req.body.addition;
    media[3] = req.body.year;
    media[4] = req.body.type;
    media[5] = req.body.status;
    await db.insert(media);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//update status
router.put("/media/update/status/:id/:status", async (req, res) => {
  try {
    await db.setStatus(req.params.id, req.params.status);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//update type
router.put("/media/update/type/:id/:type", async (req, res) => {
  try {
    await db.setType(req.params.id, req.params.type);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Type
//select all types
router.get("/type/", async (req, res) => {
  try {
    let results = await db.getTypes();
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//select type
router.get("/type/:type", async (req, res) => {
  try {
    let results = await db.getType(req.params.type);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Status
//select all statuses
router.get("/status/", async (req, res) => {
  try {
    let results = await db.getStatuses();
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//select status
router.get("/status/:status", async (req, res) => {
  try {
    let results = await db.getStatus(req.params.status);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//History
//select all history
router.get("/history/:id", async (req, res) => {
  try {
    let results = await db.getAllHist(req.params.id);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//delete one history
router.delete("/history/delete/:id", async (req, res) => {
  try {
    await db.deleteHist(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//insert history
router.post("/history/insert/", async (req, res) => {
  try {
    let history = [];
    history[0] = req.body.media_id;
    history[1] = req.body.description;
    history[2] = req.body.date;
    await db.insertHist(history);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Property Type
//select all propTypes
router.get("/proptype/", async (req, res) => {
  try {
    let results = await db.getAllPropTypes();
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//insert propType
router.post("/proptype/insert/", async (req, res) => {
  try {
    let proptype = [];
    proptype[0] = req.body.name;
    proptype[1] = req.body.rank;
    await db.insertPropType(proptype);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Property
//select all props for media
router.get("/prop/:id", async (req, res) => {
  try {
    let results = await db.getAllProps(req.params.id);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//insert prop
router.post("/prop/insert/", async (req, res) => {
  try {
    let prop = [];
    prop[0] = req.body.media_id;
    prop[1] = req.body.proptype_id;
    prop[2] = req.body.value;
    await db.insertProp(prop);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//delete
router.delete("/prop/delete/:id", async (req, res) => {
  try {
    await db.deleteProp(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
