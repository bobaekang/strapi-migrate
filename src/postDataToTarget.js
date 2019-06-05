"use strict";

// utils
const postItems = require("./utils/postItems");

/**
 * Post data to a Strapi server
 * @param {Function} client Axios client to a Strapi server
 * @param {object} data Data collection
 */
const postData = async (client, data) => {
  const apps = data.apps.map(el => {
    const { articles, datasets, ...props } = el;
    return props;
  });
  const articles = data.articles.map(el => {
    const { reportpdf, slidespdf, apps, authors, datasets, ...props } = el;
    return props;
  });
  const authors = data.authors.map(el => {
    const { articles, ...props } = el;
    return props;
  });
  const datasets = data.datasets.map(el => {
    const { datafile, apps, articles, ...props } = el;
    return props;
  });

  await postItems(client, apps, "apps");
  await postItems(client, articles, "articles");
  await postItems(client, authors, "authors");
  await postItems(client, datasets, "datasets");
};

module.exports = postData;
