"use strict";

module.exports = `query {
  authors {
    title
    external
    slug
    description
    articles {
      title
    }
  }
}`;
