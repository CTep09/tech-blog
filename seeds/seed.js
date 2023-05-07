const sequelize = require("../config/connection");
const { User, Post, Comment } = require('../models');

const userData = require("./userSeed.json");
const postData = require("./postSeed.json");
const commentData = require("./commentSeed.json");


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

    // seed comments
    const comments = await Comment.bulkCreate(commentData);
    console.log("\n------- user COMMENTS SEEDED ------\n");

    process.exit(0);
}

seedAll();