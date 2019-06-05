"use strict";

// node modules
const FormData = require("form-data");
const request = require("request");

/**
 * Submit form to target URL using data from source URL
 * @param {string} uploadURL URL to upload a file
 * @param {string} fileURL URL for a file to upload
 * @param {string} refId Item reference ID
 * @param {string} type Item content type
 * @param {string} field Name for the item field for the file
 * @param {string} filename Name for the file
 */
const submitFormData = async (
  uploadURL,
  fileURL,
  refId,
  type,
  field,
  filename
) => {
  console.log(`submitFormData(): Submitting "${filename}" to ${uploadURL}...`);
  const form = new FormData();
  form.append("files", request(fileURL), {
    filename: filename
  });
  form.append("refId", refId);
  form.append("ref", type);
  form.append("field", field);

  form.submit(uploadURL, (err, res) => {
    if (err) {
      console.log(`submitFormData(): Failure - submit "${filename}"!`);
    } else if (res.statusCode == 200) {
      console.log(`submitFormData(): Success - submit "${filename}"!`);
    } else {
      console.log(`submitFormData(): Failure - submit "${filename}"!`);
    }
  });
};

module.exports = submitFormData;
