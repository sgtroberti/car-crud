import { prisma } from "../helpers/utils.js";
import fs from "fs";

export const index = async (req, reply) => {
  try {
    const allCars = await prisma.car.findMany();
    if (!allCars[0]) {
      reply.status(404).send("Não existem carros cadastrados");
    }
    reply.status(200).send(allCars);
  } catch (error) {
    reply.status(500).send("Erro de servidor");
  }
};

export const createCar = async (req, reply) => {
  const { name, year, brand_id } = req.body;
  const image = req.file;

  try {
    const foundBrand = await prisma.brand.findUnique({
      where: {
        id: +brand_id,
      },
    });

    if (!foundBrand) {
      reply.status(404).send("Marca não existe");
    }

    const car = await prisma.car.create({
      data: {
        name,
        year,
        brand_id: +brand_id,
        image_url: image.path,
      },
    });
    return reply.status(201).send(car);
  } catch (error) {
    console.log(error);
    reply.status(500).send("Vai explodir em 3, 2, 1...");
  }
};

export const showCar = async (req, reply) => {
  try {
    const car = await prisma.car.findUnique({
      where: {
        id: +req.params.id,
      },
    });

    if (!car) {
      reply.status(404).send("Carro não encontrado");
    }
    reply.status(200).send(car);
  } catch (error) {
    reply.status(500).send("Erro de servidor");
  }
};

export const updateCar = async (req, reply) => {
  const { name, year, brand_id } = req.body;
  const image = req.file;

  try {
    const foundBrand = await prisma.brand.findUnique({
      where: {
        id: +brand_id,
      },
    });

    if (!foundBrand) {
      reply.status(404).send("Marca não existe");
    }

    const foundCar = await prisma.car.findUnique({
      where: {
        id: +req.params.id,
      },
    });

    if (!foundCar) {
      reply.status(404).send("Carro não encontrado");
    }

    fs.unlink(foundCar.image_url, (err) => err && console.log(err));

    const newCar = await prisma.car.update({
      where: {
        id: +req.params.id,
      },
      data: {
        name,
        year,
        brand_id: +brand_id,
        image_url: image.path,
      },
    });
    reply.status(200).send(newCar);
  } catch (error) {
    reply.status(500).send("Erro de servidor");
  }
};

export const deleteCar = async (req, reply) => {
  try {
    const foundCar = await prisma.car.findUnique({
      where: {
        id: +req.params.id,
      },
    });

    if (!foundCar) {
      reply.status(404).send("Carro não encontrado");
    }

    fs.unlink(foundCar.image_url, (err) => err && console.log(err));

    const deletedCar = await prisma.car.delete({
      where: {
        id: +req.params.id,
      },
    });

    reply.status(200).send(deletedCar);
  } catch (error) {
    reply.status(500).send("Erro de servidor");
  }
};

export const patchCar = async (req, reply) => {
  const data = req.body;
  const image = req.file;

  console.log(data);

  try {
    const foundCar = await prisma.car.findUnique({
      where: {
        id: +req.params.id,
      },
    });

    if (!foundCar) {
      reply.status(404).send("Carro não encontrado");
    }

    if (image) {
      fs.unlink(foundCar.image_url, (err) => err && console.log(err));
      const car = await prisma.car.update({
        where: {
          id: +req.params.id,
        },
        data: { ...data, image_url: image.path },
      });

      reply.status(201).send(car);
    } else {
      const car = await prisma.car.update({
        where: {
          id: +req.params.id,
        },
        data: { ...data },
      });

      reply.status(201).send(car);
    }
  } catch (error) {
    reply.status(500).send("Erro de servidor");
  }
};
