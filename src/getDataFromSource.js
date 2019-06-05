"use strict";

// utils
const fetchData = require("./utils/fetchData");

// queries
const queryApps = require("./queries/apps");
const queryArticles = require("./queries/articles");
const queryAuthors = require("./queries/authors");
const queryDatasets = require("./queries/datasets");

/**
 * Get data from a Starpi server
 * @param {Function} client Axios client to a Strapi server
 */
const getData = async client => {
  require("dotenv").config();

  const dataApps = await fetchData(client, "apps", queryApps);
  const dataArticles = await fetchData(client, "articles", queryArticles);
  const dataAuthors = await fetchData(client, "authors", queryAuthors);
  const dataDatasets = await fetchData(client, "datasets", queryDatasets);

  return {
    apps: dataApps.apps,
    articles: dataArticles.articles,
    authors: dataAuthors.authors,
    datasets: dataDatasets.datasets
  };
};

module.exports = getData;
