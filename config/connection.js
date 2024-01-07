const mongoose = require("mongoose");

mongoose.connect(
process.env.MONGODB_URI ||
{
userNewURLParser: true,
useUnifiedTopology: true,

}
);

// Mongo Queries will be executed here //
mongoose.set("debug", true);

module.exports = mongoose.connection;