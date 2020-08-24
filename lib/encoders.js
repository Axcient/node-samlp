const tprint = require("@auth0/thumbprint");

function removeHeaders(cert) {
  const pem = /-----BEGIN (\w*)-----([^-]*)-----END (\w*)-----/g.exec(
    (cert || "").toString()
  );

  if (pem && pem.length > 0) {
    return pem[2].replace(/[\n|\r\n]/g, "");
  }

  return "";
}

function thumbprint(pem) {
  const cert = removeHeaders(pem);

  return tprint.calculate(cert).toUpperCase();
}

module.exports = { removeHeaders, thumbprint };
