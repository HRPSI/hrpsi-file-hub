const { default: axios } = require('axios');

// The bucket name in which files are stored

// Displaying the Dashboard Page (list of files)
exports.getDashboard = async (req, res) => {
  try {
    res.render('dashboard');
  } catch (error) {
    console.error('Error listing files from S3:', error);
    res.status(500).send('Error listing files');
  }
};

  



