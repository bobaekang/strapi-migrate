"use strict";

module.exports = `query {
  datasets {
    title
    status
    external
    slug
    date
    categories
    tags
    sources
    unit
    agegroup
    timeperiod
    description
    notes
    variables
    citation
    funding
    datacsv
    datafilename
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
