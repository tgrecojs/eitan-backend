let http = require("http");
let express = require("express");
let host = "localhost";
let port = 3000;
let app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let cors = require('cors');
let Job = require('./Jobs');
// REST
mongoose.connect('mongodb://eitan:mlab1234@ds133084.mlab.com:33084/mean');


app.use(cors());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// return all the jobs that are saved in the database
app.get("/jobs", (req,res) => {
  // retrieve the jobs from the database

  Job.find((err, jobs) => {
    if (err) {
      return res.json({error: err.message, success: false});
    }

    res.json({error: false, success: true, jobs});
  });
});

app.post("/jobs", (req, res) => {
console.log('job data', req.body)
  const jobData = req.body.job;

  // save the job in the database
  const jobEntry = new Job(jobData);

  jobEntry.save((err) => {
    if (err) {
      return res.json({error: err.message, success: false});
    }

    res.json({success: true, job: jobEntry});
  });
});

app.put("/jobs/:_id", (req, res) => {
  const updatedJob = req.body.job;

  // use the id param on the url to fetch the existing job from the database

  res.json({success: true, job});
});

app.delete("/jobs" , (req, res) => {

});

app.listen(port, () => {
  console.log("it works");
})
