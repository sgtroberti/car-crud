import { prisma } from "../helpers/utils.js";

export const index = async (req, reply) => {
  try {
    const allBrands = await prisma.brand.findMany();
    if (!allBrands[0]) {
      reply.status(404).send("Não existem marcas cadastradas");
    }
    reply.status(200).send(allBrands);
  } catch (error) {
    reply.status(500).send("Erro de servidor");
  }
};

export const createBrand = async (req, reply) => {
  const { name } = req.body;

  try {
    const brand = await prisma.brand.create({
      data: {
        name,
      },
    });
    reply.status(201).send(brand);
  } catch (error) {
    reply.status(500).send("Erro de servidor");
  }
};

export const showBrand = async (req, reply) => {
  try {
    const brand = await prisma.brand.findUnique({
      where: {
        id: +req.params.id,
      },
    });

    if (!brand) {
      reply.status(404).send("Marca não encontrada");
    }
    reply.status(200).send(brand);
  } catch (error) {
    reply.status(500).send("Erro de servidor");
  }
};

export const updateBrand = async (req, reply) => {
  const { name } = req.body;

  try {
    const newBrand = await prisma.brand.update({
      where: {
        id: +req.params.id,
      },
      data: {
        name,
      },
    });
    reply.status(200).send(newBrand);
  } catch (error) {
    reply.status(500).send("Erro de servidor");
  }
};

export const deleteBrand = async (req, reply) => {
  try {
    const deletedBrand = await prisma.brand.delete({
      where: {
        id: +req.params.id,
      },
    });

    if (!deletedBrand) {
      reply.status(404).send("Marca não encontrada");
    }

    reply.status(200).send(deletedBrand);
  } catch (error) {
    reply.status(500).send("Erro de servidor");
  }
};
