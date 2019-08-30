"use strict";

module.exports = `query {
  datasets (sort: "date:asc") {
    status
    title
    slug
    date
    external
    categories
    tags
    sources
    unit
    timeperiod
    description
    notes
    variables
    funding
    citation
    datafile {
      name
      hash
      ext
    }
    apps {
      title
    }
    articles {
      title
    }
  }
}`;
