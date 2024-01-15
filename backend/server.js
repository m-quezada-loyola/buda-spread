const app = require("./app");
const mongoose = require("mongoose");

const dbUrl = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/buda-spread?authSource=admin`;

mongoose.connect(dbUrl);

app.listen(process.env.PORT, () => {
  console.log("Serving on port 3000");
});


