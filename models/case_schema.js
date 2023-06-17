const mongoose = require("mongoose");
// const user_schema = require('./user_schema');
const Schema = mongoose.Schema;

const case_schema = Schema({
  caseNo: {
    type: Number,
    required: true,
  },
  caseTitle: {
    type: String,
    required: true,
  },
  caseDiscription: {
    type: String,
  },
  status: {
    type: String,
  },
  case_useres: {
    type: [String],
  },
});

module.exports = mongoose.model("case", case_schema);
