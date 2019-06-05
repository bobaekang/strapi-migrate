"use strict";

/**
 * Fetch data from a Strapi server with graphql query
 * @param {Function} client Axios client to a Strapi server
 * @param {string} type Content type
 * @param {string} query Graphql query string
 */
const fetchData = async (client, type, query) => {
  console.log(`fetchData(): Fetching "${type}" data...`);
  try {
    const res = await client
      .post("/graphql", {
        query: query
      })
      .catch(err => {
        throw `fetchData(): Failure - fetch "${type}" data!\n${err}`;
      });

    console.log(`fetchData(): Success - fetch "${type}" data!`);
    return res.data.data;
  } catch (e) {
    console.log(e);
  }
};

module.exports = fetchData;
