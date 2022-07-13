import { Validate } from "./validation";

describe("Validate class static methods", () => {
  describe("isUsedInvalidChar", () => {
    it.each([
      ["a", false],
      ["A", false],
      ["1", false],
      ["!", true],
    ])("input %p should be %p", (param, result) => {
      expect(Validate.isUsedInvalidChar(param)).toBe(result);
    });
  });

  describe("charsNeedMore", () => {
    it.each([
      ["", 5],
      ["abcde", 0],
      ["abcdefg", 0],
    ])("input %p should be %p", (param, result) => {
      expect(Validate.charsNeedMore(param)).toBe(result);
    });
  });

  describe("charsShouldLess", () => {
    it.each([
      ["", 0],
      ["12345678901234567890", 0],
      ["123456789012345678901", 1],
      ["1234567890123456789012345", 5],
    ])("input %p should be %p", (param, result) => {
      expect(Validate.charsShouldLess(param)).toBe(result);
    });
  });

  describe("doesNotContainUppercase", () => {
    it.each([
      ["abcde", true],
      ["abCde", false],
    ])("input %p should be %p", (param, result) => {
      expect(Validate.doesNotContainUppercase(param)).toBe(result);
    });
  });

  describe("isNotValidUserID", () => {
    it.each([
      ["ABCDE", false],
      ["abCde", false],
      ["12345", false],
      ["test", true],
      ["12345678901234567890", false],
      ["123456789012345678901", true],
      ["username!", true],
    ])("input %p should be %p", (param, result) => {
      expect(Validate.isNotValidUserID(param)).toBe(result);
    });
  });

  describe("doesNotContainNumber", () => {
    it.each([
      ["ABCDE", true],
      ["abCde", true],
      ["1abcd", false],
    ])("input %p should be %p", (param, result) => {
      expect(Validate.doesNotContainNumber(param)).toBe(result);
    });
  });

  describe("isLackedNeededChars", () => {
    it.each([
      ["ABCDE", true],
      ["abcde", true],
      ["12345", true],
      ["abcd1", true],
      ["ABCD1", true],
      ["abCDE", true],
      ["", true],
      ["12abC", false],
    ])("input %p should be %p", (param, result) => {
      expect(Validate.isLackedNeededChars(param)).toBe(result);
    });
  });

  describe("isNotValidPassword", () => {
    it.each([
      ["password", true],
      ["passWord", true],
      ["passWord1", false],
      ["Ab1", true],
      ["passWord1!", true],
      ["12345678901234567890aB", true],
    ])("input %p should be %p", (param, result) => {
      expect(Validate.isNotValidPassword(param)).toBe(result);
    });
  });
});
