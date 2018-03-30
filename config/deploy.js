/* eslint-env node */
module.exports = function(deployTarget) {
  var ENV = {
    build: {},
    pipeline: {
      activateOnDeploy: true
    },
    s3: {
      profile: process.env.AWS_PROFILE,
      filePattern: '*'
    },
    cloudfront: {
      profile: process.env.AWS_PROFILE
    }
  };

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    ENV.s3.bucket = process.env.AWS_BUCKET;
    ENV.s3.region = process.env.AWS_REGION;
    ENV.cloudfront.distribution = process.env.DISTRIBUTION;
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
