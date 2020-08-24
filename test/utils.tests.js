const timekeeper = require("timekeeper");
const expect = require("chai").expect;

const utils = require("../lib/utils");

describe("utils", function () {
  describe("parseSamlRequest function", function () {
    it("should exist", function () {
      expect(utils.parseSamlRequest).to.exist;
    });
  });

  describe("generateUniqueID function", function () {
    it("should exist", function () {
      expect(utils.generateUniqueID).to.exist;
    });

    it("should return a non-empty string", function () {
      expect(utils.generateUniqueID()).to.be.a.string;
      expect(utils.generateUniqueID()).to.not.be.empty;
    });

    it("should always return a unique id", function () {
      expect(utils.generateUniqueID()).to.not.equal(utils.generateUniqueID());
    });
  });

  describe("generateInstant function", function () {
    it("should exist", function () {
      expect(utils.generateInstant).to.exist;
    });

    it("should pad the millis appropriately", function () {
      timekeeper.withFreeze(0, () => {
        expect(utils.generateInstant()).to.equal("1970-01-01T00:00:00.000Z");
      });
    });
  });

  describe("formatXmlDateTime function", function () {
    it("should exist", function () {
      expect(utils.formatXmlDateTime).to.exist;
    });

    it("should return the correct string", function () {
      const dt = new Date(2020, 1, 1, 0, 0, 0, 0);

      expect(utils.formatXmlDateTime(dt)).to.equal(dt.toISOString());
    });
  });

  describe("appendQueryString function", function () {
    it("should exist", function () {
      expect(utils.appendQueryString).to.exist;
    });

    it("should return correct string without params", function () {
      expect(utils.appendQueryString("http://localhost")).to.equal(
        "http://localhost/"
      );
    });

    it("should return correct string with params", function () {
      expect(
        utils.appendQueryString("http://localhost", { foo: "bar" })
      ).to.equal("http://localhost/?foo=bar");
    });

    it("should return correct string with params in initial url", function () {
      expect(
        utils.appendQueryString("http://localhost?foo=bar", { bar: "baz" })
      ).to.equal("http://localhost/?foo=bar&bar=baz");
    });
  });

  describe("validateSignature function", function () {
    it("should exist", function () {
      expect(utils.validateSignature).to.exist;
    });
  });
});
