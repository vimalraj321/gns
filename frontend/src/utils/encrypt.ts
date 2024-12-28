import CryptoJS from "crypto-js";

export const encryptEmailWithRandomString = (data: string) => {
  // Generate a random string using browser's crypto
  // const randomArray = new Uint8Array(12); // 12 bytes for a random string
  // window.crypto.getRandomValues(randomArray);
  // const randomString = Array.from(randomArray)
  //   .map((byte) => byte.toString(36).replace(/[\/~&.]/g, ""))
  //   .join("")
  //   .substring(0, 12); // Limit the string length

  // console.log(randomString);

  const encryptedEmail = CryptoJS.AES.encrypt(
    data,
    import.meta.env.VITE_GAMES_SECRET_KEY
  ).toString();

  return encryptedEmail;
};
