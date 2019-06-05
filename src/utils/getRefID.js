"use strict";

// node modules
const util = require("util");

/**
 * Get the ref ID of content type for the params
 * @param {Function} client Axios client
 * @param {string} type Content type
 * @param {Object} params Put params
 * @returns {string} Ref ID
 */
const getRefID = async (client, type, params) => {
  console.log(
    `getRefID(): Getting refID for "${type}" with "${util.inspect(params)}"...`
  );
  try {
    const res = await client
      .get(type, {
        params: params
      })
      .catch(err => {
        throw `getRefID(): Failure - "${type}" with "${util.inspect(params)}"`;
      });

    return res.data[0].id;
  } catch (e) {
    console.log(e);
  }
};

module.exports = getRefID;
