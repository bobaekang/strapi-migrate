"use strict";

// scripts
const setRelations = require("./utils/setRelations");

/**
 * Set all relations as specified in data collection
 * @param {Function} client Axios client to a Strapi server
 * @param {Object} data Data collection
 */
const setAllRelations = async (client, data) => {
  const apps = data.apps;
  const articles = data.articles;

  await setRelations(
    client,
    apps.filter(el => el.articles.length),
    "apps",
    "articles"
  );
  await setRelations(
    client,
    apps.filter(el => el.datasets.length),
    "apps",
    "datasets"
  );
  await setRelations(client, articles, "articles", "authors");
  await setRelations(
    client,
    articles.filter(el => el.datasets.length),
    "articles",
    "datasets"
  );
};

module.exports = setAllRelations;
