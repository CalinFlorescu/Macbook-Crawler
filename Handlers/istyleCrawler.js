const cheerio = require("cheerio");
const request = require("request-promise");
const { ISTYLE_URL: url } = require("../constants");

module.exports = () => {
  return new Promise((resolve, reject) => {
    request({
      method: "GET",
      url,
    }).then((body) => {
      let $ = cheerio.load(body);

      let priceValue = $(".price-box").text();

      priceValue = priceValue.replace(/\s/g, "");
      priceValue = priceValue.replace(",", "");
      priceValue = priceValue.slice(0, 5);

      if (priceValue) {
        resolve({
          brand: "iStyle",
          value: parseInt(priceValue),
        });
      }

      reject("Error");
    });
  });
};
