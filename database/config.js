const mongoose = require("mongoose");

const dbConnection = async () => {
    try {

      // console.log(process.env.MONGODB_CNN)
      await mongoose.connect(process.env.MONGODB_CNN, {
        // useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log("DB Online");
    } catch (error) {
      console.log(error);
      throw new Error("BD error - starting DB");
    }
  };

module.exports = { dbConnection };
