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

//select
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
    let results = await db.one(req.params.id);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//insert
router.post("/media/insert/", async (req, res) => {
  try {
    let results = await db.one();
    res.json(results);
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

//Type
//select all types
router.get("/types/", async (req, res) => {
  try {
    let results = await db.getTypes();
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//select type
router.get("/types/:type", async (req, res) => {
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

module.exports = router;
