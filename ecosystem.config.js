module.exports = {
  apps: [
    {
      name: 'gestion-truc',
      script: 'build/src/index.js',
      watch: 'build',
      env: {
        NODE_ENV: 'development',
        TEST_DB_URI: 'file',
        DB_MONGOOSE: undefined,
      },
      env_production: {
        NODE_ENV: 'production',
        TEST_DB_URI: 'mongodb://localhost:27017/gestion-stock',
        DB_MONGOOSE: 'mongoose',
      },
      env_ovh: {
        NODE_ENV: 'production',
        TEST_DB_URI: 'file',
        URI: 'file',
        DB_MONGOOSE: undefined,
        PORT: 3334,
      },
    },
  ],
};
