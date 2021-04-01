// Loading the env settings from the file.
require('dotenv').config();

export const PORT = process.env.port || 3000;
export const DRIVER = process.env.driver || 'files';
export const MONGODB_URL = process.env.mongoDBURL;
export const MONGODB_NAME = process.env.mongoDBName;
