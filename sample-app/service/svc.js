/**
 * Pure JS http REST endpoint, no external deps
 */
const http = require("http");
const hackerNews = require("./hacker-news.js");

const {
  port = 8080,
  environment = "development",
} = process.env;

const requestHandler = async (request, response) => {
  const output = { message: "Hacker News Top Stories", environment };

  // have a "healthcheck" routpute that can be used to check service health
  if (request.url === "/healthcheck") {
    if (request.method === "GET") {
      output.message = "ok";
      output.status = 200;
    }
  }

  // hacker-news routpute
  if (request.url === "/hacker-news") {
    if (request.method === "GET") {
      output.data = await hackerNews.getAllHnStories();
      output.status = 200;
    }
  }

  // "log" server access to stdout
  console.log(
    `${new Date()} [${request?.connection?.remoteAddress}], [${request?.headers?.["user-agent"]
    }], ${request.url}, [${environment}]`
  );

  // send output as json w/CORS
  response.setHeader("Content-Type", "application/json");
  response.setHeader("Access-Control-Allow-Origin", "*");

  response.statusCode = 200;
  response.end(JSON.stringify(output));
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    console.error({ err });
  }
  console.log(
    `${environment} server listening on ${port}. Healthcheck on /healthcheck`
  );

});
