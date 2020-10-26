import * as dotenv from 'dotenv';

dotenv.config({ path: `${ __dirname }/../../.env` });

export default {
    env: `${ process.env.NODE_ENV }`,
    port: 3000,
    database: "mongodb+srv://pedroparker:pedropass@cluster0.r7hcm.mongodb.net/JordiRosado?retryWrites=true&w=majority",
    jwt: {
        secretKey: `${ process.env.SECRET_KEY }`
    },
}