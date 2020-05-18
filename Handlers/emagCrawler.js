const cheerio = require("cheerio");
const request = require("request-promise");
const {
  EMAG_URL_SILVER: urlSilver,
  EMAG_URL_SPACE_GREY: urlSpaceGrey,
} = require("../constants");

const emagSilverCrawler = () => {
  return new Promise((resolve, reject) => {
    request({
      method: "GET",
      url: urlSilver,
    }).then((body) => {
      let $ = cheerio.load(body);

      let priceValue = $(".product-highlight .product-new-price").text();

      priceValue = priceValue.replace(/\s/g, "");
      priceValue = priceValue.replace(".", "");
      priceValue = priceValue.slice(0, 5);

      if (priceValue) {
        resolve({
          brand: "Emag silver",
          value: parseInt(priceValue),
        });
      }

      reject("Error");
    });
  });
};

const emagSpaceGreyCrawler = () => {
  return new Promise((resolve, reject) => {
    request({
      method: "GET",
      url: urlSpaceGrey,
    }).then((body) => {
      let $ = cheerio.load(body);

      let priceValue = $(".product-highlight .product-new-price").text();

      priceValue = priceValue.replace(/\s/g, "");
      priceValue = priceValue.replace(".", "");
      priceValue = priceValue.slice(0, 5);

      if (priceValue) {
        resolve({
          brand: "Emag Space Grey",
          value: parseInt(priceValue),
        });
      }

      reject("Error");
    });
  });
};

module.exports = { emagSilverCrawler, emagSpaceGreyCrawler };
