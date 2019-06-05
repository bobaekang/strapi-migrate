"use strict";

module.exports = `query {
  apps {
    title
    status
    external
    slug
    date
    categories
    tags
    image
    contributors
    description
    url
    citation
    funding
    articles {
      title
    }
    datasets {
      title
    }
  }
}`;
