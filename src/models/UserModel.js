const prisma = require("../config/prismaClient");

const getAllUsers = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    const take = limit;

    const users = await prisma.user.findMany({
      skip: skip,
      take: take,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    const totalUsers = await prisma.user.count();

    return {
      users, // Data user
      pagination: {
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page,
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createNewUser = async (user) => {
  try {
    const newUser = await prisma.user.create({ data: user });
    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUser = async (id, data) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: data,
    });
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    return deletedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findById = async (id) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: parseInt(id) },
    });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllUsers,
  findUserByEmail,
  createNewUser,
  updateUser,
  deleteUser,
  findById,
};
