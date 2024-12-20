export class StringUtils {
  /**
   * Validate an email address using a regular expression.
   * @param email {string} The email address to validate.
   * @returns {boolean} True if the email is valid, otherwise false.
   */
  static validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  /**
   * Check if a string contains only numeric characters.
   * @param str {string} The string to check.
   * @returns {boolean} True if the string is numeric, otherwise false.
   */
  static isNumeric(str: string): boolean {
    return /^[0-9]+$/.test(str);
  }

  /**
   * Capitalize the first letter of a string.
   * @param str {string} The string to capitalize.
   * @returns {string} The string with the first letter capitalized.
   */
  static capitalizeFirstLetter(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Trim and normalize whitespace in a string.
   * @param str {string} The string to normalize.
   * @returns {string} The trimmed and normalized string.
   */
  static normalizeWhitespace(str: string): string {
    return str.replace(/\s+/g, " ").trim();
  }

  /**
   * Check if a string is empty or contains only whitespace.
   * @param str {string} The string to check.
   * @returns {boolean} True if the string is empty, otherwise false.
   */
  static isEmpty(str: string): boolean {
    return !str || /^\s*$/.test(str);
  }

  /**
   * Convert a string to camelCase.
   * @param str {string} The string to convert.
   * @returns {string} The camelCase string.
   */
  static toCamelCase(str: string): string {
    return str
      .replace(/[-_ ](.)/g, (_, group1) => group1.toUpperCase())
      .replace(/^[A-Z]/, (firstChar) => firstChar.toLowerCase());
  }

  /**
   * Check if two strings are anagrams.
   * @param str1 {string} The first string.
   * @param str2 {string} The second string.
   * @returns {boolean} True if the strings are anagrams, otherwise false.
   */
  static areAnagrams(str1: string, str2: string): boolean {
    const formatString = (str: string) =>
      str
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .split("")
        .sort()
        .join("");
    return formatString(str1) === formatString(str2);
  }
}

export class NumberUtils {
  /**
   * Format a number with commas as thousand separators.
   * @param num {number} The number to format.
   * @returns {string} The formatted number.
   */
  static formatNumberWithCommas(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export class ValidationUtils {
  /**
   * Validate the strength of a password.
   * @param password {string} The password to validate.
   * @returns {boolean} True if the password is strong, otherwise false.
   */
  static validatePassword(password: string): boolean {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordPattern.test(password);
  }

  /**
   * Validate a URL using a regular expression.
   * @param url {string} The URL to validate.
   * @returns {boolean} True if the URL is valid, otherwise false.
   */
  static validateURL(url: string): boolean {
    const urlPattern =
      /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*(\?.*)?(#.*)?$/i;
    return urlPattern.test(url);
  }

  /**
   * Validate a hex color code.
   * @param color {string} The hex color code to validate.
   * @returns {boolean} True if the hex color code is valid, otherwise false.
   */
  static validateHexColor(color: string): boolean {
    return /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(color);
  }

  /**
   * Validate a mobile number using a regular expression.
   * @param mobileNumber {string} The mobile number to validate.
   * @returns {boolean} True if the mobile number is valid, otherwise false.
   */
  static validateMobileNumber(mobileNumber: string): boolean {
    const mobileNumberPattern = /^[+]?[0-9]{10,15}$/;
    return mobileNumberPattern.test(mobileNumber);
  }

  /**
   * Validate an email address using a regular expression.
   * (Wrapper for StringUtils.validateEmail for class consistency)
   * @param email {string} The email address to validate.
   * @returns {boolean} True if the email is valid, otherwise false.
   */
  static validateEmail(email: string): boolean {
    return StringUtils.validateEmail(email);
  }
}

export class RandomUtils {
  /**
   * Generate a random string of a given length.
   * @param length {number} The length of the random string.
   * @returns {string} The generated random string.
   */
  static generateRandomString(length: number): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  /**
   * Generate a UUID (v4).
   * @returns {string} The generated UUID.
   */
  static generateUUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
      const random = (Math.random() * 16) | 0;
      const value = char === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  }
}

export class DateUtils {
  /**
   * Check if a date string is a valid date.
   * @param dateStr {string} The date string to validate.
   * @returns {boolean} True if the string is a valid date, otherwise false.
   */
  static isValidDate(dateStr: string): boolean {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
  }

  /**
   * Check if a date string represents a date in the future.
   * @param dateStr {string} The date string to check.
   * @returns {boolean} True if the date is in the future, otherwise false.
   */
  static isFutureDate(dateStr: string): boolean {
    if (!this.isValidDate(dateStr)) return false;
    const inputDate = new Date(dateStr);
    const now = new Date();
    return inputDate.getTime() > now.getTime();
  }

  /**
   * Check if a date string represents a date in the past.
   * @param dateStr {string} The date string to check.
   * @returns {boolean} True if the date is in the past, otherwise false.
   */
  static isPastDate(dateStr: string): boolean {
    if (!this.isValidDate(dateStr)) return false;
    const inputDate = new Date(dateStr);
    const now = new Date();
    return inputDate.getTime() < now.getTime();
  }

  /**
   * Check if a date string is at least a certain number of minutes in the future.
   * @param dateStr {string} The date string to check.
   * @param minutes {number} The minimum number of minutes into the future.
   * @returns {boolean} True if the date is at least the specified minutes in the future, otherwise false.
   */
  static isDateAtLeastMinutesInFuture(
    dateStr: string,
    minutes: number
  ): boolean {
    if (!this.isValidDate(dateStr)) return false;
    const inputDate = new Date(dateStr);
    const now = new Date();
    return inputDate.getTime() > now.getTime() + minutes * 60000;
  }

  /**
   * Check if a date string has already expired (past the current date and time).
   * @param dateStr {string} The date string to check.
   * @returns {boolean} True if the date has expired, otherwise false.
   */
  static isDateExpired(dateStr: string): boolean {
    return this.isPastDate(dateStr);
  }

  /**
   * Add a specified number of days to a date string.
   * @param dateStr {string} The starting date string.
   * @param days {number} The number of days to add.
   * @returns {string} The resulting date string in ISO format.
   */
  static addDaysToDate(dateStr: string, days: number): string {
    if (!this.isValidDate(dateStr)) throw new Error("Invalid date");
    const date = new Date(dateStr);
    date.setDate(date.getDate() + days);
    return date.toISOString();
  }

  /**
   * Check if a date is within a specific range.
   * @param dateStr {string} The date to check.
   * @param startDateStr {string} The start of the range.
   * @param endDateStr {string} The end of the range.
   * @returns {boolean} True if the date is within the range, otherwise false.
   */
  static isDateInRange(
    dateStr: string,
    startDateStr: string,
    endDateStr: string
  ): boolean {
    if (
      !this.isValidDate(dateStr) ||
      !this.isValidDate(startDateStr) ||
      !this.isValidDate(endDateStr)
    )
      return false;
    const date = new Date(dateStr);
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    return date >= startDate && date <= endDate;
  }

  /**
   * Get the difference in days between two dates.
   * @param dateStr1 {string} The first date.
   * @param dateStr2 {string} The second date.
   * @returns {number} The difference in days.
   */
  static getDaysDifference(dateStr1: string, dateStr2: string): number {
    if (!this.isValidDate(dateStr1) || !this.isValidDate(dateStr2))
      throw new Error("Invalid date(s)");
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);
    const diffInMs = Math.abs(date1.getTime() - date2.getTime());
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  }

  /**
   * Format a date to a readable string in 'YYYY-MM-DD' format.
   * @param dateStr {string} The date string to format.
   * @returns {string} The formatted date string.
   */
  static formatDateToYYYYMMDD(dateStr: string): string {
    if (!this.isValidDate(dateStr)) throw new Error("Invalid date");
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  /**
   * Format a date to a readable string in a specified format.
   * @param dateStr {string} The date string to format.
   * @param formats {Array<FormatType>} The format strings (e.g. ['YYYY', 'MM', 'DD'], ['HH', 'mm', 'ss'], etc.).
   * @returns {string} The formatted date string.
   */
  static formatDate(dateStr: string, formats: Array<FormatType>): string {
    if (!this.isValidDate(dateStr)) throw new Error("Invalid date");
    const date = new Date(dateStr);
    const components: Record<FormatType, string> = {
      YYYY: date.getFullYear().toString(),
      MM: String(date.getMonth() + 1).padStart(2, "0"),
      DD: String(date.getDate()).padStart(2, "0"),
      HH: String(date.getHours()).padStart(2, "0"),
      mm: String(date.getMinutes()).padStart(2, "0"),
      ss: String(date.getSeconds()).padStart(2, "0"),
    };
    return formats.map((format) => components[format]).join("");
  }
}
type FormatType = "YYYY" | "MM" | "DD" | "HH" | "mm" | "ss";
