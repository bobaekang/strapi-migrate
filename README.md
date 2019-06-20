# Migrating data between Strapi servers

This is a Node.js program to migrate data between two Strapi servers for ICJIA Research Hub.

## Prerequisites

Prerequisites to use this program include:

- Node.js and NPM
- Two Strapi servers with
  - Identical content types setup
  - Authenticated users with access to all content types and uploads
  - Graphql plugin installed

## Adopt this repo for your own use case

Although this repo's scripts are written for a particular use case, it is possible to adopt this repo for a custom use case. This is because all `src/utils/*js` scripts are written with generic use cases in mind.

Therefore, with some custom changes to `src/*.js` and `src/queries/*.js` scripts, any project should be able to use the current repo to migrate data between any two Strapi servers.

## Key files

- `.env`: Stores the URL and authentication information for source and target Strapi servers to be used as environment variables.
- `main.js`: A script to run the program (this is what the `npm run start` command executes).
- `src/getDataFromSource.js`: A module script to get data for basic field types (no relations or uploads) of all content types from the source Strapi server.
- `src/postDataToTarget.js`: A module script to post data for basic field types (no relations or uploads) of all content types to the target Strapi server.
- `src/setAllRelations.js`: A module script to set relations between content types as specified in the source Strapi server.
- `src/transferAllUploads.js`: A module script to transfer all uploads files.

## Quickstart

1. Clone this repo

```sh
git clone https://github.com/bobaekang/strapi-migrate.git
cd strapi-migrate
```

2. Install npm modules

```sh
npm install
```

3. Have both Strapi servers running

4. Assign values to `.env` variables:

- `API_OLD_URL`: URL for the source Strapi server with data
- `API_OLD_ID`: Identifer of the authenticated user with GET and POST access for the source Strapi server
- `API_OLD_PW`: Password of the authenticated user with GET and POST access for the source Strapi server
- `API_NEW_URL`: URL for the Target Strapi server
- `API_NEW_ID`: Identifer of the authenticated user with GET and POST access for the target Strapi server
- `API_NEW_PW`: Password of the authenticated user with GET and POST access for the target Strapi server

5. Make custom changes as needed to the following files (default is based on the ICJIA Research Hub project):

```
main.js
src/getDataFromSource.js
src/postDataToTarget.js
src/setAllRelations.js
src/transferAllUploads.js
src/queries/*.js
```

6. Run program

```sh
npm run start
```
