var db = require("../models");

beforeAll(() => {
  // Clears the database and adds some testing data.
  // Jest will wait for this promise to resolve before running tests.
  return db.sequelize.sync({ force: true }).then(() => console.log("Drop and re-sync db."));
});

describe('integration test jest', () => {

  test('is delicious', () => {
    return db['User'].findAll().then(users => 
      expect(users).toStrictEqual([])
    );
  });

  afterAll(() => {
    return db.sequelize.connectionManager.close().then(() => console.log('shut down gracefully'));
  });
});