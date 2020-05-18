const altexCrawler = require("./Handlers/altexCrawler");
const istyleCrawler = require("./Handlers/istyleCrawler");
const pcgarageCrawler = require("./Handlers/pcgarageCrawler");
const {
  emagSilverCrawler,
  emagSpaceGreyCrawler,
} = require("./Handlers/emagCrawler");

const insertData = require("./databaseLogic");

const getOffers = async () => {
  const now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);

  Promise.all([
    altexCrawler(),
    istyleCrawler(),
    pcgarageCrawler(),
    emagSilverCrawler(),
    emagSpaceGreyCrawler(),
  ]).then((values) => {
    const offers = [...values];
    values.forEach((value, index) => {
      offers[index].date = day;
    });

    insertData(offers);

    console.log("inserted");
  });
};

setInterval(getOffers, 86400000);
