declare module "login-with-huma-node" {
    export interface User {
        email?: string;
        phone?: string;
        city?: string;

        [key: string]: any;
    }

    export interface ExchangeCodeResult {
        info?: User;
        user?: User;
        accessToken: string;
        accessTokenExpireTime: string;
        refreshToken: string;
        refreshTokenExpireTime: string;
    }

    export default class server {
        constructor(options: {
            clientSecret?: string | null;
            clientId?: string | null,
            accessToken?: string | null,
            accessTokenExpireTime?: string | null,
            refreshToken?: string | null,
            refreshTokenExpireTime?: string | null,
        })

        exchangeTemporaryCode(accessToken?: string): Promise<ExchangeCodeResult>;

        userInfo(): User | null;

        getUserData(accessToken?: string): Promise<User>;

        hasUserLoggedOut(phone: string, macAddress: string): Promise<boolean>;
    }

}
