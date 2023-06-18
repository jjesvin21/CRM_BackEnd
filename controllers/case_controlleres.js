const cases = require("../models/case_schema");
const user = require("../models/user_schema");
const add_new_case = async (req, res) => {
  try {
    const new_case = await cases.create({
      caseNo: req.body.caseid,
      caseTitle: req.body.casetitle,
      caseDiscription: req.body.casediscription,
      status: req.body.status,
      case_useres: req.body.case_user,
    });
  

  for (item of req.body.case_user) {
    console.log("______________________________________________\n");
    
      let userdata = await user.updateOne(
        { _id: item },
        {
          $push: {
            myCases: {
              case_id: new_case._id,
            },
          },
        }
      );
    

    console.log(userdata);
    console.log("______________________________________________\n");
  }

  return res.status(200).json(new_case);
}
catch(e)
{
  res.status(400).json({"msg":e.message});
}
}
;

const getallcases = async (req, res) => {
  cases_data = await cases.find();
  return res.status(200).json(cases_data);
};

const getindudual_case = async (req, res) => {
  console.log(req.params.id);
  try {
    case_data = await cases.findOne({ _id: req.params.id });
    console.log(case_data);
    return res.status(200).json(case_data);
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

const updatestatus = async (req, res) => {
  try {
    case_data = await cases.updateOne(
      { _id: req.params.id },
      { status: req.body.status }
    );
    return res.status(200).json(case_data);
  } catch (e) {
    return res.status(200).json({ msg: e.message });
  }
};

module.exports = { add_new_case, getallcases, getindudual_case, updatestatus };
