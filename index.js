const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.static(__dirname + '/'));

app.get("/", (req,res) => { res.sendFile(__dirname + "/index.html"); });
const myDetails = { 
    success: true,
    email:"vesnathan@gmail.com",
    phone: "0423 867 510",
    addressL1: "29 Susans Bay Rd",
    addressL2: "Primrose Sands",
    addressL3: "Tasmania, 7173"
};

app.get("/contactDetails", (req,res) => { res.send(myDetails); });

const secretKey = "";
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
            res.send("ERROR: "+response.data);  
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