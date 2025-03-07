exports.constants = {
    backendUrl: process.env.BACKEND_URL || 'http://localhost:3000',
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsRegion: process.env.AWS_REGION,
    awsS3BucketName: process.env.AWS_S3_BUCKET_NAME,
    port: process.env.PORT || 4400,
    login: '/auth/login',
};

