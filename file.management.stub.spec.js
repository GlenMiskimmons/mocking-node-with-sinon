const { expect } = require("chai");
const sinon = require("sinon");
const fs = require("fs");
const proxyquire = require("proxyquire");

describe("File Management", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Should write a new file", () => {
    const writeStub = sinon.stub(fs, "writeFileSync");
    const fileManagement = proxyquire("./file.management", {fs});

    fileManagement.createFile("test.txt");
    expect(writeStub.callCount).to.equal(1);
  });

  it("Should throw an exception if the file already exists", () => {
    const writeStub = sinon.stub(fs, "writeFileSync");
    writeStub.throws(new Error());
    const fileManagement = proxyquire("./file.management", {fs});

    expect(() => fileManagement.createFile("test.txt")).to.throw();
  });
});
