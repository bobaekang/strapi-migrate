"use strict";

const util = require("util");

/**
 * Send PUT request to an item with data
 * @param {Function} client Axios client
 * @param {string} type Item content type
 * @param {string} refID Reference ID
 * @param {Object} data Data for the PUT request
 */
const updateData = async (client, type, refID, data) => {
  console.log(`updateData(): updating "${type} (${refID})"...`);
  console.log(data.articles);
  const typeSingle = type.slice(0, -1);
  const typeSingleCapitalized =
    typeSingle.charAt(0).toUpperCase() + typeSingle.slice(1);
  const dataString = util.inspect(data).replace(/'/g, '"');

  const mutation = `mutation {
    update${typeSingleCapitalized} (input: {
      where: {
        id: "${refID}"
      },
      data: ${dataString}
    }) {
      ${typeSingle} {
        {
          createdAt
        }
      }
    }
  }
  `;

  client
    .post("/graphql", {
      mutation: mutation
    })
    .then(res => {
      if (res.status === 200) {
        console.log(`updateData(): Success - update "${type} (${refID})"!`);
      } else {
        throw "updateData(): Failure - resposne status other than 200.";
      }
    })
    .catch(err => {
      throw err;
    });
};

module.exports = updateData;
