"use strict";

module.exports = `query {
  articles {
    title
    status
    external
    slug
    date
    type
    categories
    tags
    splash
    thumbnail
    images
    abstract
    markdown
    citation
    doi
    funding
    reportpdf {
      name
      hash
      ext
    }
    slidespdf {
      name
      hash
      ext
    }
    apps {
      title
    }
    authors {
      title
    }
    datasets {
      title
    }
  }
}`;
