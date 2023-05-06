const sequelize = require("../config/connection");
const { User } = require('../models');

const userData = require("./userSeed.json");


const seedAll = async () => {
    await sequelize.sync({ force: true });

    const user = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
      });

    console.log("\n------- user DATA SEEDED ------\n");

    process.exit(0);
}

seedAll();