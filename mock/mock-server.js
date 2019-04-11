const chokidar = require("chokidar");
const bodyParser = require("body-parser");
const chalk = require("chalk");

function registerRoutes(app) {
  let mockStartIndex;
  const { default: mocks } = require("./index.js");
  for (const mock of mocks) {
    app[mock.type](mock.url, mock.response);
    mockStartIndex = app._router.stack.length;
  }
  const mockRoutesLength = Object.keys(mocks).length;
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockStartIndex - mockRoutesLength
  };
}

function unregisterRoutes() {
  Object.keys(require.cache).forEach(i => {
    if (i.includes("/mock")) {
      delete require.cache[require.resolve(i)];
    }
  });
}

module.exports = app => {
  // es6 polyfill
  require("@babel/register");

  // parse app.body
  // http://expressjs.com/en/4x/api.html#req.body
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  const mockRoutes = registerRoutes(app);
  var mockRoutesLength = mockRoutes.mockRoutesLength;
  var mockStartIndex = mockRoutes.mockStartIndex;

  // watch files, hot reload mock server
  chokidar
    .watch("./mock", {
      ignored: "mock/mock-server.js",
      persistent: true,
      ignoreInitial: true
    })
    .on("all", (event, path) => {
      if (event === "change" || event === "add") {
        // remove mock routes stack
        app._router.stack.splice(mockStartIndex, mockRoutesLength);

        // clear routes cache
        unregisterRoutes();

        const mockRoutes = registerRoutes(app);
        mockRoutesLength = mockRoutes.mockRoutesLength;
        mockStartIndex = mockRoutes.mockStartIndex;

        console.log(
          chalk.magentaBright(
            `\n > Mock Server hot reload success! changed  ${path}`
          )
        );
      }
    });
};
