"use strict";

module.exports = `query {
  articles (sort: "date:asc") {
    status
    title
    slug
    date
    external
    categories
    tags
    authors
    splash
    thumbnail
    images
    abstract
    markdown
    funding
    citation
    doi
    mainfile {
      name
      hash
      ext
    }
    extrafile {
      name
      hash
      ext
    }
    apps {
      title
    }
    datasets {
      title
    }
  }
}`;
