const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password ,admin} = req.body

  try {
    const user = await User.login(email, password ,admin)

    // create a token
    const token = createToken(user._id)
    res.cookie('token', token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: false, // Set to true in production with HTTPS
      sameSite: 'Strict', // Adjust as necessary
      maxAge: 3600000 // Cookie expiration time in milliseconds (1 hour)
    });

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
const logoutUser = (req, res) => {
  res.clearCookie('token'); // Clear the cookie named 'token'
  res.status(200).json({ message: 'Logged out successfully' });
};
// signup a user
const signupUser = async (req, res) => {
  const {email, password, admin} = req.body

  try {
    const user = await User.signup(email, password,admin)

    // create a token
    const token = createToken(user._id)
    res.cookie('token', token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: false, // Set to true in production with HTTPS
      sameSite: 'Strict', // Adjust as necessary
      maxAge: 3600000 // Cookie expiration time in milliseconds (1 hour)
    });
    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser,logoutUser }