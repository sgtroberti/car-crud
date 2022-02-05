import multer from "fastify-multer";
import path from "path";
import * as CarsController from "../controllers/cars-controller.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    const extention = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + extention);
  },
});

const upload = multer({ storage });

const routes = {
  getCars: {
    method: "GET",
    url: "/cars",
    handler: CarsController.index,
  },
  getCarById: {
    method: "GET",
    url: "/cars/:id",
    handler: CarsController.showCar,
  },
  createCar: {
    method: "POST",
    url: "/cars",
    preHandler: upload.single("image_url"),
    handler: CarsController.createCar,
  },
  updateCar: {
    method: "PUT",
    url: "/cars/:id",
    preHandler: upload.single("image_url"),
    handler: CarsController.updateCar,
  },
  deleteCar: {
    method: "DELETE",
    url: "/cars/:id",
    handler: CarsController.deleteCar,
  },
  patchCar: {
    method: "PATCH",
    url: "/cars/:id",
    preHandler: upload.single("image_url"),
    handler: CarsController.patchCar,
  },
};

const renderRoutes = Object.values(routes);

export default (fastify, _, next) => {
  for (const route of renderRoutes) {
    fastify.route(route);
  }
  next();
};
