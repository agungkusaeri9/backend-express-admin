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

module.exports = { getAllUsers };
