"use strict";

// node modules
const util = require("util");

// scripts
const getRefID = require("./getRefID");

/**
 * Put relations between source and target content types
 * @param {Function} client Axios client to a strapi server
 * @param {Object[]} items Array of source items
 * @param {string} source Source content type
 * @param {string} target Target content type
 */
const setRelations = async (client, items, source, target) => {
  /**
   * Helper function to get an array of ref IDs of type filtered by params
   * @param {Object[]} paramsArr Array of params
   */
  const targetIDsHelper = async paramsArr => {
    return Promise.all(
      paramsArr.map(async params => await getRefID(client, target, params))
    );
  };

  /**
   * Helper function to make graphql mutation request
   * @param {string} sourceID Source reference ID
   * @param {string[]} targetIDs Array of target reference IDs
   */
  const mutationHelper = (sourceID, targetIDs) => {
    const sourceSingle = source.slice(0, -1);
    const sourceSingleCapitalized =
      sourceSingle.charAt(0).toUpperCase() + sourceSingle.slice(1);
    const targetIDsString = util.inspect(targetIDs).replace(/'/g, '"');

    return `mutation {
      update${sourceSingleCapitalized}(
        input: {
          where: {
            id: "${sourceID}"
          },
          data: {
            ${target}: ${targetIDsString}
          }
        }
      ) {
        ${sourceSingle} {
          ${target} {
            createdAt
          }
        }
      }
    }
    `;
  };

  console.log(
    `setRelations(): Setting up relations betwen "${source}" and "${target}"...`
  );

  items
    .filter(el => el[target])
    .forEach(async el => {
      const sourceTitle = el.title;
      const sourceID = await getRefID(client, source, { title: sourceTitle });
      const targetIDs = await targetIDsHelper(el[target]);
      const mutation = mutationHelper(sourceID, targetIDs);

      client
        .post("/graphql", {
          query: mutation
        })
        .then(res => {
          if (res.status === 200)
            console.log(
              `setRelations(): Success - set relations for "${source} (${sourceID})"!`
            );
        })
        .catch(err => {
          console.log(
            `setRelations(): Failure - set relations for "${source} (${sourceID}) ${err}"!`
          );
        });
    });
};

module.exports = setRelations;
