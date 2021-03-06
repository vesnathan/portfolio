require("dotenv").config();
const { _AWS_AKI, _AWS_SAK, _AWS_REGION,  _RECAPTCHA_SECRET_KEY} = require("./config/config.js");
const express = require("express");
const axios = require("axios");
const app = express();


var AWS = require('aws-sdk');
AWS.config.update({region: 'REGION'});

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req,res) => { res.sendFile(__dirname + "/index.html"); });
app.post("/email", (req,res) => { 
    console.log(req.body);
    res.json({"status":"success"});
});
const myDetails = { 
    success: true,
    email:"vesnathan@gmail.com",
    phone: "0423 867 510",
    addressL1: "29 Susans Bay Rd",
    addressL2: "Primrose Sands",
    addressL3: "Tasmania, 7173"
};

app.get("/contactDetails", (req,res) => { res.send(myDetails); });

const secretKey =   _RECAPTCHA_SECRET_KEY;
app.get("/recaptcha", (req,res) => { 
    
    axios.post('https://www.google.com/recaptcha/api/siteverify', undefined, {
        params: {
            secret: secretKey,
            response: req.query.token
        },
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    })
    .then((response) => { 
        if (response.data.success === true) {
            res.send(myDetails);
        } 
        else {
            res.send(response);  
        }
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    });  
    // res.send(myDetails);
});
const port = process.env.PORT;
app.listen(port, () => console.log(`listening on port: ${port}`));