"use strict";

// utils
const getRefID = require("./getRefID");
const submitFormData = require("./submitFormData");

/**
 * Transfer uploads to target URL using files from source URL
 * @param {string} sourceClient Axios client to source Strapi server
 * @param {string} targetClient Axios client to target Strapi server
 * @param {Object[]} items Items of the content type
 * @param {string} type Content type
 * @param {string} field Upload field name
 */
const transferUploads = async (
  sourceClient,
  targetClient,
  items,
  type,
  field
) => {
  console.log(
    `transferUploads(): Transfering uploads files for "${type}:${field}"...`
  );

  const sourceUploadURL = `${sourceClient.defaults.baseURL}/uploads`;
  const targetUploadURL = `${targetClient.defaults.baseURL}/upload`;
  const typeSingular = type.slice(0, -1);

  items
    .filter(el => el[field])
    .forEach(async el => {
      const targetTitle = el.title;
      const refId = await getRefID(targetClient, type, { title: targetTitle });
      const file = el[field];
      const filename = file.name;
      const fileURL = `${sourceUploadURL}/${file.hash}${file.ext}`;

      submitFormData(
        targetUploadURL,
        fileURL,
        refId,
        typeSingular,
        field,
        filename
      );
    });
};

module.exports = transferUploads;
