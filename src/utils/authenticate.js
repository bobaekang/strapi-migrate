"use strict";

const axios = require("axios");

/**
 * Fetch data from a Strapi server with graphql query
 * @param {Function} client Axios client to a Strapi server
 * @param {string} identifier Identifier for authentication
 * @param {string} password Password for authentication
 */
const authenticate = async (client, identifier, password) => {
  console.log(`authenticate(): Authenticating client...`);

  try {
    const res = await axios({
      url: client.defaults.baseURL + "/auth/local",
      method: "post",
      data: { identifier, password },
      headers: {
        "Content-Type": "application/json"
      }
    });

    client.defaults.headers.common["Authorization"] = `Bearer ${res.data.jwt}`;
    console.log(`authenticate(): Success!`);
  } catch (e) {
    console.log(`authenticate(): Failure!\n${e}`);
  }
};

module.exports = authenticate;
