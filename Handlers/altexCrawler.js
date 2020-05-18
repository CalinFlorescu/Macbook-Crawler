const cheerio = require("cheerio");
const request = require("request-promise");
const { ALTEX_URL: url } = require("../constants");

module.exports = () => {
  return new Promise((resolve, reject) => {
    request({
      method: "GET",
      url,
    }).then((body) => {
      let $ = cheerio.load(body);

      let priceValue = $(".Price-current .Price-int").text();

      priceValue = priceValue.replace(".", "");
      priceValue = priceValue.slice(0, 5);

      if (priceValue) {
        resolve({
          brand: "Altex",
          value: parseInt(priceValue),
        });
      }

      reject("Error");
    });
  });
};
