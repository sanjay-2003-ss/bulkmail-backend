const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const nodemailer = require("nodemailer");
const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://Sanjay:2003@cluster0.uu7enka.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0")
.then(function(){
    console.log("DB is connected")
}).catch(function(){
    console.log("Failed")
})

const credentials = mongoose.model("credentials",{},"bulkmail")

app.post("/sendemail", function (req, res) {
    let msg = req.body.msg
    let emails = req.body.emails
    console.log(msg)

credentials.find()
.then(function(data){
       // Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: 'sanjaykiruthish@gmail.com',
        pass: 'ynee rhrs vmah snqt',
    },
});

    new Promise(async function(resolve,reject){       
    try {
        for (let i = 0; i < emails.length; i++)
        {
           await transporter.sendMail(
                {
                    from: "sanjaykiruthish@gmail.com",
                    to: emails[i],
                    subject: "A message from bulkmail app",
                    text: msg

                },
            )
            console.log("Email sent to:"+emails[i])
        }
       resolve("Success")
    }
    catch (error) {
        reject("Fail")
    }

    }).then(function(){
        res.send(true)
    }).catch(function(){
        res.send(false)
    })

}).catch(function(error){
    console.log(error)
})

})
app.listen(5000, function () {
    console.log("Server Started...");

})