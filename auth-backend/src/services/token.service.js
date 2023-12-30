import Token from "../model/token.model.js";

export const tokenRefresh = async token => {
    try {
        const validToken = Token.findOne({ token: token });
        if (!validToken) return { message: `No valid token found` };
        return validToken;
    } catch (err) {
        throw err;
    }
}

export const removeToken = async token => {
    try {
        const tokenToRemove = await Token.deleteOne({ token: token });
        return tokenToRemove;
    } catch (err) {
        throw err;
    }
}
