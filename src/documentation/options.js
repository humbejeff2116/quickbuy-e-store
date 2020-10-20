









 module.exports = {
    definition: {
      openapi: "3.0.0",
      info: require("./info"),
      servers:require("./servers"),
      tags: [
        {
          name: 'CRUD operations'
        }
      ],
      components:require("./components") ,
      paths: require("./paths"),
    },
    apis: ["../routes/api_routes"],
  };