const sequelize = require("../config/connection");
const { User, Post } = require('../models');

const userData = require("./userSeed.json");
const postData = require("./postSeed.json");


const seedAll = async () => {
    await sequelize.sync({ force: true });

    const user = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
      });

    console.log("\n------- user DATA SEEDED ------\n");
    
    // seed posts
    const posts = await Post.bulkCreate(postData);
    console.log("\n------- user POSTS SEEDED ------\n");

    process.exit(0);
}

seedAll();