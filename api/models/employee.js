const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
const Employee_schema = new mongoose.Schema({
  id: String,
  first_name: String,
  last_name: String,
  email: String,
  gender: String
});
Employee_schema.plugin(mongoosePaginate);
/* exports (mongoose.model("Employee", Employee_schema)); */
// const Employee = mongoose.model("Employee", Employee_schema);
module.exports = mongoose.model("Employee", Employee_schema);
