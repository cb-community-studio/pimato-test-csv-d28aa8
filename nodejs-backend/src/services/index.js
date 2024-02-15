const users = require("./users/users.service.js");
const employee = require("./employee/employee.service.js");
const stores = require("./stores/stores.service.js");
const sales = require("./sales/sales.service.js");
const invetory = require("./invetory/invetory.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    app.configure(users);
  app.configure(employee);
  app.configure(stores);
  app.configure(sales);
  app.configure(invetory);
    // ~cb-add-configure-service-name~
};
