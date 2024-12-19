import { CLIENT_CRYPTO_SECRET } from "./environtment";
import CryptoJS from "crypto-js";

export const EncryptJSON = (data) => {
    const jsonString = JSON.stringify(data);
    const encryptedData = CryptoJS.AES.encrypt(jsonString, CLIENT_CRYPTO_SECRET).toString();

    return encryptedData
}

export const DecryptJSON = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, CLIENT_CRYPTO_SECRET);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return decryptedData
}