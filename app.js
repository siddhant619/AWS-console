const express = require("express");
const fs = require("fs");
const describeVPCandInstances = require("./routes/describeVPCandInstances");
const startStopInstance = require("./routes/startStopInstance");
const createInstance = require("./routes/createInstance");
const createEnvironment = require("./routes/createEnvironment");
const contact = require("./routes/contact");
const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"));
app.use(express.json());
// Import the Amazon S3 service client
/* const S3 = require("@aws-sdk/client-s3"); 
// Create an S3 client in the us-west-1 Region
const s3Client = new S3.S3Client({
    region: "us-west-1"
  });

console.log(s3Client) */

app.use("/", describeVPCandInstances);
app.use("/startStopInstance", startStopInstance);
app.use("/createInstance", createInstance);
app.use("/createEnvironment", createEnvironment);
app.use("/contact", contact);
app.listen(3000, () => {
  console.log("listening on port 3000...");
});
