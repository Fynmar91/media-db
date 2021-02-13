const express = require("express");
const db = require("../db");
const router = express.Router();

//select all
router.get("/", async (req, res) => {
  try {
    let results = await db.getAll();
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//select
router.get("/:id", async (req, res) => {
  try {
    let results = await db.getOne(req.params.id);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//update
router.put("/update/:id", async (req, res) => {
  try {
    let results = await db.one(req.params.id);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//delete
router.delete("/delete/:id", async (req, res) => {
  try {
    let results = await db.one(req.params.id);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//insert
router.post("/insert/", async (req, res) => {
  try {
    let results = await db.one(req.params.id);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
