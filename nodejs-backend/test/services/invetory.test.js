const assert = require('assert');
const app = require('../../src/app');

describe('\'invetory\' service', () => {
  it('registered the service', () => {
    const service = app.service('invetory');

    assert.ok(service, 'Registered the service (invetory)');
  });
});
