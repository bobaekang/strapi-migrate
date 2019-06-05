"use strict";

/**
 * Post items of a content type
 * @param {Function} client Axios client
 * @param {Object[]} items Items to post
 * @param {string} type Content type
 */
const postItems = async (client, items, type) => {
  console.log(`postItems(): making POST request for "${type}" items...`);
  items.forEach(el => {
    client
      .post(type, el)
      .then(res => {
        console.log("postItems(): Sucess - ", res.data.title);
      })
      .catch(err => {
        console.log("postItems(): Failure - ", el.title);
      });
  });
};

module.exports = postItems;
