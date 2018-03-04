From the top of the project directory first ensure that you have a `MongoDB` instance running on port `27017`, then:

In `server/index.js`:
* Uncomment the lines that are preceded by `// Testing`
* Comment lines: `server.use(cookieParser());`, and `server.use(tokenCheck);`

Then run:

`npm run seed`\
`node server`

Before running any of the tests. Note that running `npm run seed` will destroy any data in the `matryoksha` database in your `MongoDB` instance.

To switch back to production simply do the reverse of what you did above.