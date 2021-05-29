const User = require("./../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "suPErSecuRESEcrEt"
const expiry = 3600;

exports.registerNewUser = (req, res, next) => {
  // fetch user's details from request body
  const { firstName, lastName, username, password } = req.body;
  
  User.findOne({username: req.body.username}, (err, existingUser) => {
    if (err) return next(err);
    // check if user with this username exists
    if (existingUser) return res.json({ message: `User '${existingUser.username}' already exists`});

    // create a new user“
    User.create({firstName, lastName, username }, (err, newUser) => {
      if (err) return next(err);
    
    // hash password
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(password, salt, (err, hashedPassword) => {
        if (err) return next(err);
        // save password to database
        newUser.password = hashedPassword;
        newUser.save((err, savedUser) => {
          if (err) return next(err);
          // create jwt for user
          jwt.sign({
            id: newUser._id,
            username: newUser.username,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            role: newUser.role
          }, secret, {expiresIn: expiry}, (err, token) => {
              if (err) return next(err);
              // send jwt to user
              res.json({ message: "User registration successful", token })
          })
        })
      })
    })

    });
  })
}

exports.loginUser = (req, res, next) => {
  // check if user exists
  User.findOne({username: req.body.username}, (err, foundUser) => {
    if (err) return next(err);
    if (!foundUser) return next({ status: 401, message: "Incorrect Username" });
    // check if password is correct
    bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
      if (err) return next(err);
      if (!isMatch) return next({ status: 401, message: "Invalid Password" });

      // create a token
      jwt.sign({
        id: foundUser._id,
        username: foundUser.username,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        role: foundUser.role
      }, secret, { expiresIn: expiry }, (err, token) => {
        if (err) return next(err);
          // send token to user
          res.json({ message: "User logged-in", token });
      });

    });


  });
}