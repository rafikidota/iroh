export const EnvConfiguration = () => ({
    ENVIRONMENT: process.env.NODE_ENV || 'dev',
    PORT: Number(process.env.PORT) || 3000,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET,
    SWAGGER_JSON: process.env.SWAGGER_JSON,
});
