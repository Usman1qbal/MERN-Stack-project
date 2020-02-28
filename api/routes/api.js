var express = require("express");
const Employee = require("../models/employee");
var router = express.Router();

router.get("/", function(req, res, next) {
  res.send("api is working properly");
});

router.get("/emps", async (req, res) => {
  Employee.find()
    .limit(parseInt(req.query.limit, 10))
    .skip(parseInt(req.query.skip, 10))
    .exec(function(err, employees) {
      if (err) {
        console.log(err);

        return;
      } else {
        return res.send(employees);
      }
    });
});

module.exports = router;
