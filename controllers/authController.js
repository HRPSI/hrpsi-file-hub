const axios = require('axios');
const { constants } = require('../constants');

exports.getLoginPage = (req, res) => {
  // If user is already logged in, redirect to /files
  if (req.session.user) {
    return res.redirect('/files');
  }
  res.render('login');
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await axios.post(`${constants.backendUrl}/auth/login`, {
      email,
      password,
      deviceId:'1234',
      languageIsoCode:"en"
    });

    if (response.data.success) {
      req.session.user = response.data;
      // return res.redirect('/files');
    } else {
      return res.render('login', { error: response.data.message });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.render('login', { error: 'Login failed. Please try again.' });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
