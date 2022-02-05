import Fastify from "fastify";
import fastifyStatic from "fastify-static";
import path from "path";
import multer from "fastify-multer";
import helmet from "fastify-helmet";
import brandsRoute from "./routes/brands-routes.js";
import carsRoute from "./routes/cars-routes.js";

const __dirname = path.resolve();

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/public",
});

fastify.register(multer.contentParser);

fastify.register(helmet);

// Declare a route
fastify.register(brandsRoute);
fastify.register(carsRoute);

// Run the server!
fastify.listen(3000, (err, address) => {
  if (err) throw err;
  console.log(`Server is now listening on ${address}`);
});
