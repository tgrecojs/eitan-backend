let http = require("http");
let express = require("express");
let host = "localhost";
let port = 4000;
let app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let cors = require('cors');
let Job = require('./Jobs');
// REST

const dev = 'mongodb://localhost:27017/jobs';
const prod = 'mongodb://eitan:mlab1234@ds133084.mlab.com:33084/mean';
mongoose.connect(dev);



app.use(cors());
app.use(bodyParser.json());       // to support JSON-encoded bodies
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
  const jobData = req.body.data;

  // save the job in the database
  const jobEntry = new Job({
    title: req.body.data.title,
    company: req.body.data.company,
    location: req.body.data.location,
    createdBy: req.body.data.createdBy
  });
  console.log('jobEntry',jobEntry)
  
  jobEntry.save((err) => {
    if (err) {
      return res.json({error: err.message, success: false});
    }

    res.json({success: true, job: jobData});
  });
});

app.put("/jobs/:_id", (req, res) => {
  const updatedJob = req.body.job;

  // use the id param on the url to fetch the existing job from the database

  res.json({success: true, job});
});

app.delete("/jobs/:id" , (req, res) => {
  Job.findByIdAndRemove(req.params._id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Job removed from db!' });
  });
});

app.listen(port, () => {
  console.log("it works");
})
