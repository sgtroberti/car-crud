import * as BrandsController from "../controllers/brands-controller.js";

const routes = {
  getBrands: {
    method: "GET",
    url: "/brands",
    handler: BrandsController.index,
  },
  getBrandById: {
    method: "GET",
    url: "/brands/:id",
    handler: BrandsController.showBrand,
  },
  createBrand: {
    method: "POST",
    url: "/brands",
    handler: BrandsController.createBrand,
  },
  updateBrand: {
    method: "PUT",
    url: "/brands/:id",
    handler: BrandsController.updateBrand,
  },
  deleteCar: {
    method: "DELETE",
    url: "/brands/:id",
    handler: BrandsController.deleteBrand,
  },
};

const renderRoutes = Object.values(routes);

export default (fastify, _, next) => {
  for (const route of renderRoutes) {
    fastify.route(route);
  }
  next();
};
