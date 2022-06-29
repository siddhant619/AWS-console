const axios = require("axios");

const terminateInstance = async (req, res) => {
  console.log(req.body);
  const body = { instanceID: req.body.id };
  try {
    const { data } = await axios.post(
      "https://2n9p2tsx33.execute-api.us-east-1.amazonaws.com/dev/terminateinstance",
      body
    );
    if (data.success === "true")
      return res.status(200).json({ data: data.data });
    else return res.status(400).json({ errorMessage: data.message });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ errorMessage: "Error: " + e.response.data.message });
  }
};
module.exports = { terminateInstance };
