'use strict';
exports.now = () => {
    return Math.floor(new Date().getTime() / 1000);
};