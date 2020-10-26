import jwt from 'jsonwebtoken';
import config from "../utils/config";


export default class Token {
    
    private static seed: string = config.jwt.secretKey;
    private static accessTokenExp: string = '12h';
    private static refreshTokenExp: string = '2d';

    constructor() {}

    static getAccessToken(payload: any): string {
        return jwt.sign({
            user: payload
        }, this.seed, { expiresIn: this.accessTokenExp })
    }

    static getRefreshAccessToken(payload: any): string {
        return jwt.sign({
            user: payload
        }, this.seed, { expiresIn: this.refreshTokenExp });
    }

    static checkToken(token: string) {

        return new Promise((resolve, reject) => {

            jwt.verify(token, this.seed, (err, decoded) => {
                if(err) { 
                    reject(err) 
                } else {
                    resolve(decoded);
                }
            });
        });
    }

    static async checkRefreshToken(refreshToken: string) {

        try {
            
            const decoded: any    = await this.checkToken(refreshToken);
            const token           = await this.getAccessToken(decoded.user);
            const newRefreshToken = await this.getRefreshAccessToken(decoded.user);

            return {
                user: decoded,
                token,
                newRefreshToken
            }

        } catch (error) { throw error; }
    }
}