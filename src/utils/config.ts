import * as dotenv from 'dotenv';

dotenv.config({ path: `${ __dirname }/../../.env` });

export default {
    env: `${ process.env.NODE_ENV }`,
    port: 3000,
    database: process.env.MONGO_ATLAS,
    jwt: {
        secretKey: `${ process.env.SECRET_KEY }`
    },
}