const cheerio = require("cheerio");
const request = require("request-promise");
const { PCGARAGE_URL: url } = require("../constants");

module.exports = () => {
  return new Promise((resolve, reject) => {
    request({
      method: "GET",
      url,
    }).then((body) => {
      let $ = cheerio.load(body);

      let priceValue = $(".ps-sell-price meta").attr("content");

      priceValue = priceValue.replace(".", "");
      priceValue = priceValue.slice(0, 5);

      if (priceValue) {
        resolve({
          brand: "PC Garage",
          value: parseInt(priceValue),
        });
      }

      reject("Error");
    });
  });
};
