const express = require('express');
const router = express.Router();
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
//const bcrypt = require('bcrypt');
const bcrypt = require('bcrypt-nodejs');

const dbOperation = require("../data/users");

router.get("/", (req, res) => {
    if (req.user) {
        res.redirect('/mainpage');
    }
    else {
        res.render('user/login', { error: req.flash('invalid') });
    }
});

router.get("/jumpage", (req, res) => {
    if (req.user) {
        res.redirect('/mainpage');
    }
    else {
        res.render('user/register');
    }
});



router.post("/registerSubmit", async (req, res) => {

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


router.post("/login", async (req, res) => {

    //console.log(req.body);
    //console.log(req.body.email_login);

    // if (!req.body.email_login)  throw "email cannot be empty"
    // if (!req.body.password_login) throw "password cannot be empty"

    if (!req.body.email_login) {
        //res.status(400).json({ error: "emaol CANNOT BE EMPTY" });
        return res.send("email cannot be empty");
    }

    if (!req.body.password_login) {
        //res.status(400).json({ error: "PASSWORD CANNOT BE EMPTY" });
        return res.send("PASSWORD CANNOT BE EMPTY");
    }

    const userObj = await dbOperation.getUser(req.body.email_login);

    if (!userObj) {
        return res.send("This email is not exist");
    }

    console.log(userObj.password_login);
    console.log(req.body.password_login);

    console.log(userObj);

    //const passwordMatches = await bcrypt.compare(req.body.password_login, userObj.passwordHash);
    const passwordMatches = await bcrypt.compareSync(req.body.password_login, userObj.password);

    if (!passwordMatches) {
        console.log("wrong password");
        res.send("password is not correct");
    } else {
        console.log("login successfully");
        //req.user = true;
        res.render('user/mainpage');
    }


});

// router.post("/login", (req, res) => {

//     // if(!req.body.email_login)  throw "email cannot be empty"
//     // if(!req.body.password_login)  throw "password cannot be empty"

//     //console.log("11111");

//     if (!req.body.email_login) {
//         res.send("email cannot be empty");
//     } else if (!req.body.password_login) {
//         console.log("test11111111111111111");
//         res.send("password cannot be empty");
//     } else {
//         const userObj = dbOperation.getUser(req.body.email_login);
//         //console.log(userObj);

//         //if the typed password match to database password, login successfully
//         if (userObj.password = req.body.password_login) {
//             console.log("login successfully");
//             //req.user = true;
//             res.render('user/mainpage');
//         } else {
//             console.log("wrong password");
//             res.send("password is not correct");
//         }
//     }

// });






module.exports = router;



