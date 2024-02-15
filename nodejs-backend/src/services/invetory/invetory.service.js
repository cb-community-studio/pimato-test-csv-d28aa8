const { Invetory } = require('./invetory.class');
const createModel = require('../../models/invetory.model');
const hooks = require('./invetory.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/invetory', new Invetory(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('invetory');

  service.hooks(hooks);
};