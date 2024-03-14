export default () => ({
  port: parseInt(process.env.PORT as string, 10) || 3000,
  database: {
    uri: process.env.DATABASE_URI,
  },
  redis: {
    uri: process.env.REDIS_URI,
  },
});
