const UserModel = require("../schema/patient.schema");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const patientController = {
  authLogin: async (req, res) => {
    const bodyData = req.body;
    console.log("bodyData", bodyData);
    try {
      if (!bodyData || !bodyData?.email || !bodyData?.password) throw new Error('Payload Email and password is required.');
      const findUser = await UserModel.findOne({ email: bodyData?.email });
      if (!findUser) throw new Error("Invalid username or password");
      console.log("findUser")

      bcrypt.compare(bodyData?.password, findUser.password, function (err, result) {
        const token = jwt.sign(
          { email: findUser?.email },
          process.env.SECRET_TOKEN_KEY,
          {
            expiresIn: '1h'
          }
        )
        res.send({
          message: "User token generated.",
          authToken: token,
        })
      });

    } catch (err) {
      res.status(500).send({
        message: err.message,
        msg: JSON.stringify(err)
      })
    }

  },

  authSignup: async (req, res) => {
    const saltRounds = 10;
    const bodyData = req.body;
    console.log("bodyData", bodyData)
    try {
      if (!bodyData || !bodyData?.email || !bodyData?.password) throw new Error('Payload Email and password is required.');
      const findUser = await UserModel.findOne({ email: bodyData?.email });

      if (findUser) throw new Error("this user is already exists")
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(bodyData?.password, salt, function (err, hash) {
          bodyData['password'] = hash;
          UserModel.create(bodyData).then(async data => {
            return res.status(201).send({
              message: "User created successfully",
              data: data
            });
          }).catch(err => {
            console.log(err)
            return res.status(500).send({
              error: "Error Creating User"
            });
          })
        });
      });

    } catch (err) {
      return res.status(500).send({
        error: err.message,
        msg: JSON.stringify(err)
      })
    }
  },

  updateProfile: async (req, res) => {
    const bodyData = req.body;
    console.log(bodyData)
    try {
      if (!bodyData || !bodyData?.email) throw new Error('Payload Email is required.');
      const updateDetails = await UserModel.findOneAndUpdate({ email: bodyData?.email }, { $set: bodyData }, { upsert: true });
      res.send(updateDetails)
    } catch (err) {
      res.status(500).send({
        message: err?.message,
        msg: JSON.stringify(err)
      })
    }
  },

  getDetailByEmailId: async (req, res) => {
    const userEmail = req.params.email;
    console.log("userEmail",userEmail)
    try {
      if (!userEmail) throw new Error('Payload Email is required.');
      const fetchedUser = await UserModel.findOne({ email: userEmail });
      if(!fetchedUser) throw new Error('No patient found with this Email.');
      res.send(fetchedUser)
    } catch (err) {
      res.status(500).send({
        message: err.message,
        msg: JSON.stringify(err)
      })
    }
  },

  allPatientLists: async (req, res) => {
    try {
      const fetchedUsers = await UserModel.find();
      res.send(fetchedUsers)
    } catch (err) {
      res.status(500).send({
        message: err.message,
        msg: JSON.stringify(err)
      })
    }
  }
}

module.exports = patientController;