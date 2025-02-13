const AWS = require('aws-sdk');

// AWS credentials & region from environment variables or .env file
// In .env, you might have:
// AWS_ACCESS_KEY_ID=yourAccessKey
// AWS_SECRET_ACCESS_KEY=yourSecretAccessKey
// AWS_REGION=yourRegion
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

module.exports = AWS;
