From the top of the project directory first ensure that you have a `MongoDB` instance running on port `27017`, then:

In `server/index.js`:
* Uncomment the lines that are preceded by `// Testing`
* Comment lines: `server.use(cookieParser());`, and `server.use(tokenCheck);`

In `server/api.js`:
* Comment line: `router.use(tokenCheck);`

Then run:

`npm run seed`\
`node server`

Note that running `npm run seed` will destroy any data in the `matryoksha` database in your `MongoDB` instance.

To run the tests:

`npm run test`

To switch back to production simply do the reverse of what you did above.

The tests are highly dependent on the seed data. Everytime you run the tests you will have to use `npm run seed`.