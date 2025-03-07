const AWS = require('../config/awsConfig');
const s3 = new AWS.S3();

// The bucket name in which files are stored
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || 'your-bucket-name';

// Displaying the Dashboard Page (list of files)
exports.getDashboard = async (req, res) => {
  try {
    // Retrieve query params for pagination, search, sort
    let page = parseInt(req.query.page) || 1;
    let pageSize = 5; // items per page
    let search = req.query.search || '';
    let sort = req.query.sort || 'desc'; // 'asc' or 'desc' by date

    // Get files from S3
    // Using listObjectsV2
    const params = {
      Bucket: BUCKET_NAME,
      // If we want to use pagination for large sets of objects, we can use `ContinuationToken`.
      // For simplicity, we'll fetch all and then do manual pagination in memory.
    };

    const data = await s3.listObjectsV2(params).promise();

    // Format S3 response objects
    let files = data.Contents.map((obj) => {
      return {
        name: obj.Key,
        lastModified: obj.LastModified
      };
    });

    // Filter by name
    if (search) {
      files = files.filter((file) =>
        file.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort by date
    if (sort === 'asc') {
      files.sort((a, b) => new Date(a.lastModified) - new Date(b.lastModified));
    } else {
      files.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
    }

    // Pagination
    const totalItems = files.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedFiles = files.slice(startIndex, endIndex);
    const totalPages = Math.ceil(totalItems / pageSize);

    res.render('dashboard', {
      user: req.session.user,
      files: paginatedFiles,
      currentPage: page,
      totalPages,
      search,
      sort
    });
    // res.render('dashboard');
  } catch (error) {
    console.error('Error listing files from S3:', error);
    res.status(500).send('Error listing files');
  }
};

exports.uploadFiles = async (req, res) => {
    try {
      if (!req.files || !req.files.length) {
        return res.status(400).send('No files uploaded or invalid file types.');
      }
  
      // req.files is an array of files
      for (const file of req.files) {
        const fileContent = file.buffer;
        const fileName = file.originalname;
  
        const params = {
          Bucket: BUCKET_NAME,
          Key: fileName,
          Body: fileContent
        };
  
        // Upload each file to S3
        await s3.upload(params).promise();
        console.log(`Uploaded: ${fileName}`);
      }
  
      return res.redirect('/files');
    } catch (err) {
      console.error('Error uploading files:', err);
      return res.status(500).send('Error uploading files');
    }
  };
  
// New: Download file from S3
exports.downloadFile = async (req, res) => {
    try {
      const fileName = req.params.fileName;
      const params = {
        Bucket: BUCKET_NAME,
        Key: fileName
      };
      const data = await s3.getObject(params).promise();
  
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      res.setHeader('Content-Type', data.ContentType);
      return res.send(data.Body);
    } catch (error) {
      console.error('Error downloading file:', error);
      return res.status(500).send('Error downloading file');
    }
  };


  exports.deleteFile = async (req, res) => {
    try {
      const fileName = req.params.fileName;
      const params = {
        Bucket: BUCKET_NAME,
        Key: fileName
      };
      
      // Delete the object from S3
      await s3.deleteObject(params).promise();
      console.log('File deleted successfully:', fileName);
  
      return res.redirect('/files');
    } catch (error) {
      console.error('Error deleting file:', error);
      return res.status(500).send('Error deleting file');
    }
  };



exports.previewFile = async (req, res) => {
    const fileName = req.params.fileName;
  
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Expires: 60 // URL valid for 60 seconds, for example
    };
  
    try {
      const presignedUrl = await s3.getSignedUrlPromise('getObject', params);
      // Return the URL to the client (or render a view that includes this URL)
      return res.render('preview', { fileUrl: presignedUrl, fileName });
    } catch (err) {
      console.error('Error generating presigned URL:', err);
      return res.status(500).send('Error generating preview URL');
    }
  };