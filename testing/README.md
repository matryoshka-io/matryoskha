From the top of the project directory first ensure that you have a `MongoDB` instance running on port `27017`, then:

In `server/index.js`:
* Uncomment the lines that are preceded by `// Testing`
* Comment lines: `server.use(cookieParser());`, and `server.use(tokenCheck);`

In `server/api.js`:
* Comment line: `router.use(tokenCheck);`

Then run:

`npm run seed`\
`node server`

Before running any of the tests. Note that running `npm run seed` will destroy any data in the `matryoksha` database in your `MongoDB` instance.

To run the tests:

`npm run test`

To switch back to production simply do the reverse of what you did above.

The tests are highly dependent on the seed data. Everytime you run the tests you will have to use `npm run seed`. The order in which these tests run also matters, ideally it should be `home.test.js`, `public.test.js`, then `useractions.test.js`. Jest by default seems to run all tests in parallel, which is annoying. Furthermore the order in which Jest discovers these test files also seems unpredictable, either way I've added the `-i` option in the `test` script in the `package.json` to ensure that tests run serially. All I know is that tests will now run one after the other, as to which order they run in, that's a different question.
