## ❯ Scripts and Tasks

All script are defined in the `package.json` file, but the most important ones are listed here.

### Install

- Install all dependencies with `yarn install`

### Environment

- Create a `.env` file from the template `.env.example` file.
- Create database schema with name define by `DB_NAME` in `.env`

### Running in dev mode

- Run `yarn dev` to start nodemon with ts-node.
- The server address will be start default on port `8080` as `http://localhost:8080`. You can change port in `.env`

### Building the project and run it

- Run `yarn start` to generate all JavaScript files from the TypeScript sources and start app in `dist`.

### Database Migration

- Generate migration (replace CreateEntity with name of the migration)

`yarn migration:create CreateEntity`

### Database Seeding
- Generate seed data (replace SeederClass with name of your seeder class)

`yarn baseEntity && yarn seed SeederClass && yarn activeEntity`

### Check code style
`yarn check:style`
