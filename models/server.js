const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";
    this.authPath = "/api/auth";
    this.rentalPath = "/api/rentals";
    this.clientPath = "/api/clients";
    this.tenantPath = "/api/tenants";

    // Connect DB
    this.dbConnect();

    //Middleware
    this.middleware();
    // Routes
    this.routes();
  }

  async dbConnect() {
    await dbConnection();
  }

  // CORS

  //Middleware
  middleware() {
    // CORS Logic
    // const whitelist = [
    //   "http://localhost:3000",
    //   "http://localhost:3001",
    //   "https://immobilier-f87b1.web.app",
    // ];

    // let ori = "";

    // const corsOptions = {
    //   origin: function (origin, callback) {
    //     ori = origin;
    //     console.log(origin + " <- ORIGIN *************");
    //     if (whitelist.indexOf(origin) !== -1) {
    //       callback(null, true);
    //     } else {
    //       callback(new Error("Not allowed by CORS"));
    //     }
    //   },
    // };

    // console.log(ori + " <- ORIGIN - ORI *************");

    // //CORS ALLOWED
    // this.app.use(cors(corsOptions));
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());
    // Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.usersPath, require("../routes/user"));
    this.app.use(this.rentalPath, require("../routes/rental"));
    this.app.use(this.clientPath, require("../routes/client"));
    this.app.use(this.tenantPath, require("../routes/tenant"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto " + this.port);
    });
  }
}
module.exports = Server;