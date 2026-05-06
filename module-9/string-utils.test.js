const { capitalize, reverse, countWords, isEmail } = require("./string-utils");

describe("capitalize", () => {
  test("capitalizes first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  test("handles empty string", () => {
    expect(capitalize("")).toBe("");
  });
});

describe("reverse", () => {
  test("reverses string", () => {
    expect(reverse("hello")).toBe("olleh");
  });

  test("handles empty string", () => {
    expect(reverse("")).toBe("");
  });
});

describe("countWords", () => {
  test("counts words correctly", () => {
    expect(countWords("hello world")).toBe(2);
  });

  test("handles empty string", () => {
    expect(countWords("")).toBe(0);
  });
});

describe("isEmail", () => {
  test("valid email", () => {
    expect(isEmail("test@example.com")).toBe(true);
  });

  test("invalid email", () => {
    expect(isEmail("not-an-email")).toBe(false);
  });
});
