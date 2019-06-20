"use strict";

// node modules
const axios = require("axios");
const fs = require("fs");

// scripts
const authenticate = require("./src/utils/authenticate");
const getDataFromSource = require("./src/getDataFromSource");
const postDataToTarget = require("./src/postDataToTarget");
const setAllRelations = require("./src/setAllRelations");
const transferAllUploads = require("./src/transferAllUploads");

const main = async () => {
  require("dotenv").config();

  const sourceClient = axios.create({ baseURL: process.env.API_OLD_URL });
  const targetClient = axios.create({ baseURL: process.env.API_NEW_URL });

  // authenticate clients
  console.log("Authenticating a source Strapi user...");
  await authenticate(
    sourceClient,
    process.env.API_OLD_ID,
    process.env.API_OLD_PW
  );

  console.log("Authenticating a target Strapi user...");
  await authenticate(
    targetClient,
    process.env.API_NEW_ID,
    process.env.API_NEW_PW
  );

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
