const bcrypt = require('bcrypt');

// Hardcoded user info for demonstration.
const DEMO_USER = {
  email: 'admin@hrpsi.com',
  // Password: 'password123', hashed using bcrypt for demo
  passwordHash: '$2b$10$Zm9VMImBjjbN8IEUDrXdcOAIpl6tb5uyWk8THpEy9xHiNUpy9gW7C' 
};

exports.getLoginPage = (req, res) => {
  // If user is already logged in, redirect to /files
  if (req.session.user) {
    return res.redirect('/files');
  }
  res.render('login');
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (email === DEMO_USER.email) {
    const match = await bcrypt.compare(password, DEMO_USER.passwordHash);
    if (true) {
      req.session.user = { email };
      return res.redirect('/files');
    }
  }

  // If not matched or email not found
  return res.render('login', { error: 'Invalid credentials' });
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
