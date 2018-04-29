const express = require('express');
const router = express.Router();
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
//const bcrypt = require('bcrypt');
const bcrypt = require('bcrypt-nodejs');

const dbOperation = require("../data/users");



router.get("/register", (req, res) => {
    console.log("here");
    res.render('main/register');

});

router.post("/register", async (req, res) => {

    // if (!req.body.firstname) throw "firstname cannot be empty"
    // if (!req.body.lastname) throw "lastname cannot be empty"
    // if (!req.body.email) throw "email address cannot be empty"
    // if (!req.body.password) throw "password cannot be empty"
    // if (!req.body.dateofbirth) throw "date of birth cannot be empty"
    // if(!req.body.gender)  throw "gender cannot be empty"

    // if (req.body.firstname.length > 20) throw ("firstname address is too long")
    // if (req.body.lastname.length > 20) throw ("lastname address is too long")
    // if (req.body.email.length > 50) throw ("email address is too long")
    // if (req.body.password.length > 20) throw ("password address is too long")

    if (!req.body.firstname) return res.send("firstname cannot be empty");
    if (!req.body.lastname) return res.send("lastname cannot be empty");
    if (!req.body.email)  return res.send("email address cannot be empty");
    if (!req.body.password)  return res.send("password cannot be empty");
    if (!req.body.dateofbirth) return res.send("date of birth cannot be empty");
    if(!req.body.gender)  return res.send("gender cannot be empty");

    if (req.body.firstname.length > 20) return res.send("firstname address is too long");
    if (req.body.lastname.length > 20) return res.send("lastname address is too long");
    if (req.body.email.length > 50) return res.send("email address is too long");
    if (req.body.password.length > 20) return res.send("password address is too long");

    try {
        //use bcrypt
        //const hash = await bcrypt.hash(req.body.password, 10);     

        //use bcrypt-nodejs
        const hash = await bcrypt.hashSync(req.body.password);

        //add the registered email and password to database  email and password are the key  (html id)
        await dbOperation.createUser(req.body.firstname, req.body.lastname, req.body.email, hash, req.body.dateofbirth, req.body.gender);
        res.redirect("/login");

    } catch (e) {
        console.log(e);
    }
})







module.exports = router;



