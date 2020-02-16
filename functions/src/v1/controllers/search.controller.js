const { spotifyService } = require('../services');

const search = async (req, res) => {
  const query = req.query.q;
  const searchResult = await spotifyService.search(query);
  res.status(200).send(searchResult);
}

module.exports = {
  search,
};
