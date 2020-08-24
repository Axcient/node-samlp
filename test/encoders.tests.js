const expect = require("chai").expect;

const { removeHeaders, thumbprint } = require("../lib/encoders");

describe("encoders", function () {
  describe("removeHeaders function", function () {
    it("should exist", function () {
      expect(removeHeaders).to.exist;
    });

    it("should return a string by default [empty string]", function () {
      expect(removeHeaders("")).to.equal("");
    });

    it("should return a string by default [null]", function () {
      expect(removeHeaders(null)).to.equal("");
    });

    it("should return a string by default [undefined]", function () {
      expect(removeHeaders()).to.equal("");
    });

    it("should strip BEGIN and END", function () {
      expect(
        removeHeaders(
          "-----BEGIN CERTIFICATE-----\nSomething clever here\n-----END CERTIFICATE-----\n"
        )
      ).to.equal("Something clever here");
    });

    it("should strip BEGIN and END [no newlines]", function () {
      expect(
        removeHeaders(
          "-----BEGIN CERTIFICATE-----Something clever here-----END CERTIFICATE-----"
        )
      ).to.equal("Something clever here");
    });

    it("should strip BEGIN and END [newlines in cert]", function () {
      expect(
        removeHeaders(
          "-----BEGIN CERTIFICATE-----\nSomething \nclever \nhere\n-----END CERTIFICATE-----\n"
        )
      ).to.equal("Something clever here");
    });

    it("should strip BEGIN and END [carriage returns and newlines in cert]", function () {
      expect(
        removeHeaders(
          "-----BEGIN CERTIFICATE-----\r\nSomething \r\nclever \r\nhere\r\n-----END CERTIFICATE-----\r\n"
        )
      ).to.equal("Something clever here");
    });
  });

  describe("thumbprint function", function () {
    it("should exist", function () {
      expect(thumbprint).to.exist;
    });

    it("should return a non-empty string by default [empty string]", function () {
      expect(thumbprint("")).to.be.a.string;
      expect(thumbprint("")).to.not.be.empty;
    });

    it("should return a non-empty string by default [null]", function () {
      expect(thumbprint(null)).to.be.a.string;
      expect(thumbprint(null)).to.not.be.empty;
    });

    it("should return a non-empty string by default [undefined]", function () {
      expect(thumbprint()).to.be.a.string;
      expect(thumbprint()).to.not.be.empty;
    });

    it("should return the same result for the same input", function () {
      expect(thumbprint("")).to.equal(thumbprint(""));
    });
  });
});
