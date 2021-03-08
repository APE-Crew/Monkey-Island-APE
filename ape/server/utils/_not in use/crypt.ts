// install: npm i crypto-js
// install: npm install --save @types/crypto-js
import CryptoJS from "crypto-js";

export const encryptString = (string: string, masterKey: string): string => {
  return CryptoJS.AES.encrypt(string, masterKey).toString();
};
export const decryptString = (string: string, masterKey: string): string => {
  var bytes = CryptoJS.AES.decrypt(string, masterKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
