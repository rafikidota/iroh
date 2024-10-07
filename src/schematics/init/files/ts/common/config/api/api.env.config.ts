export const ApiEnvConfig = () => ({
  API_HOST: process.env.API_HOST,
  API_PORT: Number(process.env.API_PORT) || 3000,
  ENVIRONMENT: process.env.NODE_ENV || 'dev',
});
