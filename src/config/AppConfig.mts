export const APP_CONIFG = {
    USER_POOL_ID: process.env.AWS_COGNITO_USER_POOL_ID,
    REGION: process.env.AWS_REGION || 'us-east-1',
    COGNITO_CLIENT_ID: process.env.AWS_COGNITO_CLIENT_ID,
};