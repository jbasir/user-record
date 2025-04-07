const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createRecord = async (data) => {
  return await prisma.registros.create({
    data
  });
};

const getAllRecords = async () => {
  return await prisma.registros.findMany();
};

module.exports = {
  createRecord,
  getAllRecords
};