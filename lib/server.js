'use strict';

const rp = require('request-promise');
const utilities = require('./utilities');

// TODO: add refresh token function
class server {
    constructor(
        {
            clientSecret = null, clientId = null,
            accessToken = null, accessTokenExpireTime = null,
            refreshToken = null, refreshTokenExpireTime = null,
        } = {}) {
        this._url = 'https://auth.huma.ir/api';
        this._clientSecret = clientSecret || process.env.HUMA_CLIENT_SECRET;
        this._clientId = clientId || process.env.HUMA_CLIENT_ID;
        this._accessTokenExpireTime = accessTokenExpireTime;
        this._accessToken = accessToken;
        this._refreshToken = refreshToken;
        this._refreshTokenExpireTime = refreshTokenExpireTime;
        this._info = null;
        if (!this._clientSecret || !this._clientId) {
            throw new Error('credentials needed');
        }
    }

    get userInfo() {
        return this._info;
    }


    /**
     * calls Huma Auth api and exchange temporary code with user info and access Token
     * @param {String} code temporary code (your client have fetched from huma login client)
     * @returns {Promise<*>}
     */
    async exchangeTemporaryCode(code) {
        let options = {
            method: 'GET',
            url: this._url + '/token',
            qs: {
                clientSecret: this._clientSecret,
                clientId: this._clientId,
                code: code
            },
            headers: {
                "Content-Type": "application/json"
            },
            json: true
        };
        let result = await rp(options);
        for (const field in result) {
            if (result.hasOwnProperty(field)) {
                this[`_${field}`] = result[field];
            }
        }
        return result;
    }

    /**
     *
     * returns user data. needs a valid accessToken. If your instance has used exchangeTemporaryCode successfully,
     * accessToken is saved, otherwise feed a valid token to this function
     * @param [accessToken]
     * @returns {Promise<Object{}>} user info, containing scope needed (for now only phone)
     */
    async getUserData(accessToken = null) {
        /** throw error if access token is not given as function input nor saved from previous exchange code */
        if (!accessToken && !this._accessToken) {
            throw Error('access Token Needed');
        }
        if (!accessToken && this._accessToken) {

            /** if you have expire time for token, check its expire time */
            if (this._accessTokenExpireTime && this._accessTokenExpireTime < utilities.now()) {
                throw Error('access token expire time')
            }
        }
        this._accessToken = accessToken || this._accessToken;
        let options = {
            method: 'GET',
            url: this._url + '/client/user',
            qs: {
                accessToken: this._accessToken,
            },
            headers: {
                "Content-Type": "application/json"
            },
            json: true
        };
        let result = await rp(options);
        this._info = result;
        return result;
    }




}

module.exports = server;