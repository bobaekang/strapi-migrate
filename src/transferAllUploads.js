"use strict";

// custom modules
const transferUploads = require("./utils/transferUploads");

/**
 * Add uploads files to target using uploads files from source
 * @param {Function} sourceClient Axios client to source Strapi server
 * @param {Function} targetClient Axios client to target Strapi server
 * @param {Object} data
 */
const transferAllUploads = async (sourceClient, targetClient, data) => {
  /**
   * Helper function for transfer uploads for multiple fields
   * @param {string} type Content type
   * @param {string[]} fields Array of upload fields
   */
  const uploadsHelper = async (type, fields) => {
    fields.forEach(async field => {
      await transferUploads(
        sourceClient,
        targetClient,
        data[type],
        type,
        field
      );
    });
  };

  const articleUploadFields = ["mainfile", "extrafile"];
  await uploadsHelper("articles", articleUploadFields);

  const datasetUploadFields = ["datafile"];
  await uploadsHelper("datasets", datasetUploadFields);
};

module.exports = transferAllUploads;
