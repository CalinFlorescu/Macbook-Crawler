const { MongoClient } = require("mongodb");
const { MONGO_URL: url } = require("./constants");

const writeData = async (laptops) => {
  const client = new MongoClient(url);

  try {
    await client.connect();

    const db = client.db("Offers");

    laptops.forEach((item) => {
      db.collection("Macbook Pro prices")
        .insertOne({
          item,
        })
        .then((response) => {});
    });
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

module.exports = writeData;
