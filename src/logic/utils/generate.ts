export class GeneratorUtils {
  /**
   * Generate a numeric OTP (One-Time Password) of the specified length.
   * @param length {number} The length of the OTP.
   * @returns {string} The generated OTP.
   */
  static generateNumericOTP(length: number): string {
    const charset = "0123456789";
    let otp = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      otp += charset.charAt(randomIndex);
    }

    return otp;
  }

  /**
   * Generate an alphanumeric string of the specified length.
   * @param length {number} The length of the string.
   * @returns {string} The generated string.
   */
  static generateAlphanumericString(length: number): string {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset.charAt(randomIndex);
    }

    return result;
  }

  /**
   * Generate a random password with a mix of uppercase, lowercase, numbers, and special characters.
   * @param length {number} The length of the password.
   * @returns {string} The generated password.
   */
  static generatePassword(length: number): string {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&";
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }

    return password;
  }

  /**
   * Generate a random hexadecimal color code.
   * @returns {string} The generated hexadecimal color.
   */
  static generateHexColor(): string {
    const hexCharset = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * hexCharset.length);
      color += hexCharset.charAt(randomIndex);
    }

    return color;
  }

  /**
   * Generate a random UUID (v4).
   * @returns {string} The generated UUID.
   */
  static generateUUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
      const random = (Math.random() * 16) | 0;
      const value = char === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  }

  /**
   * Generate a random numeric string of a specified length.
   * @param length {number} The length of the numeric string.
   * @returns {string} The generated numeric string.
   */
  static generateNumericString(length: number): string {
    const charset = "0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset.charAt(randomIndex);
    }

    return result;
  }

  /**
   * Generate a random string from a custom character set.
   * @param length {number} The length of the string.
   * @param charset {string} The character set to use.
   * @returns {string} The generated string.
   */
  static generateCustomString(length: number, charset: string): string {
    if (!charset || charset.length === 0) {
      throw new Error("Charset must be a non-empty string");
    }

    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset.charAt(randomIndex);
    }

    return result;
  }

  /**
   * Generate a random date within a specified range.
   * @param startDate {Date} The start of the range.
   * @param endDate {Date} The end of the range.
   * @returns {Date} The generated random date.
   */
  static generateRandomDate(startDate: Date, endDate: Date): Date {
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();

    if (startTimestamp >= endTimestamp) {
      throw new Error("Start date must be earlier than end date");
    }

    const randomTimestamp =
      Math.floor(Math.random() * (endTimestamp - startTimestamp + 1)) +
      startTimestamp;

    return new Date(randomTimestamp);
  }
}
