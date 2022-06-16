const userID_Exp = /^[0-9a-zA-Z]{5,20}$/;
const password_Exp = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])^[0-9a-zA-Z]{5,20}$/;
const doesContainUppercaseExp = /(?=.*[A-Z])/;
const doesContainLowercaseExp = /(?=.*[a-z])/;
const doesContainNumberExp = /(?=.*[0-9])/;
const isNotUseInvalidCharExp = /^[0-9a-zA-Z]*$/;
const isContainAllCharsExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
const MIN = 5;
const MAX = 20;

export class Validate {
  static isUsedInvalidChar = (param: string): boolean => {
    if (!param) return false;
    return !isNotUseInvalidCharExp.test(param);
  };

  static charsNeedMore = (param: string): number => {
    let diff: number = MIN - param.length;
    if (diff < 0) diff = 0;
    return diff;
  };

  static charsShouldLess = (param: string): number => {
    let diff: number = param.length - MAX;
    if (diff < 0) diff = 0;
    return diff;
  };

  static doesNotContainUppercase = (param: string): boolean => {
    return !doesContainUppercaseExp.test(param);
  };

  static doesNotContainLowercase = (param: string): boolean => {
    return !doesContainLowercaseExp.test(param);
  };

  static doesNotContainNumber = (param: string): boolean => {
    return !doesContainNumberExp.test(param);
  };

  static isLackedNeededChars = (param: string): boolean => {
    return !isContainAllCharsExp.test(param);
  };

  static isNotValidUserID = (username: string): boolean => {
    return !userID_Exp.test(username);
  };

  static isNotValidPassword = (password: string): boolean => {
    return !password_Exp.test(password);
  };
}
