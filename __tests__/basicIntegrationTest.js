const db = require("../models");

describe('integration test jest', () => {
  beforeAll(() => {
    // Clears the database and adds some testing data.
    // Jest will wait for this promise to resolve before running tests.
    return db.sequelize.sync({ force: true }).then(() => console.log("Drop and re-sync db."));
  });

  test('is delicious', () => {
    return db['User'].findAll().then(users => 
      expect(users).toStrictEqual([])
    );
  });

  afterAll(() => process.exit(0));
});