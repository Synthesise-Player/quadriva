const express = require('express');

const { searchController } = require('../controllers');

const router = express.Router();

router.get('/', async (req, res) => {
  const query = req.query.q;
  const searchResult = await searchController.search(query);
  res.status(200).send(searchResult);
});

module.exports = router;
