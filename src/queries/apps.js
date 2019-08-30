"use strict";

module.exports = `query {
  apps (sort: "date:asc") {
    status
    title
    slug
    date
    external
    categories
    tags
    contributors
    image
    description
    url
    funding
    citation
    articles {
      title
    }
    datasets {
      title
    }
  }
}`;
