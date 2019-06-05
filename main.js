"use strict";

// node modules
const axios = require("axios");
const fs = require("fs");

// scripts
const getDataFromSource = require("./src/getDataFromSource");
const postDataToTarget = require("./src/postDataToTarget");
const setAllRelations = require("./src/setAllRelations");
const transferAllUploads = require("./src/transferAllUploads");

const main = async () => {
  require("dotenv").config();

  const sourceClient = axios.create({ baseURL: process.env.URL_API_OLD });
  const targetClient = axios.create({ baseURL: process.env.URL_API_NEW });

  console.log("Getting data from the source Strapi server...");
  const data = await getDataFromSource(sourceClient);

  console.log("Writing data from the source Strapi server...");
  fs.writeFileSync("files/data.json", JSON.stringify(data));

  console.log("Posting data to the target Strapi server...");
  await postDataToTarget(targetClient, data);

  console.log(
    "Setting up all relations between content types in the target Strapi server..."
  );
  await setAllRelations(targetClient, data);

  console.log(
    "Transfering uploads from the source Strapi server to the target Strapi server..."
  );
  await transferAllUploads(sourceClient, targetClient, data);
};

main();
