const service = require('../service/StatisticsService');
const db = { sequelize: {} }

describe('unit test jest', () => {
  beforeEach(() => {
    // mock query function
    db.sequelize.query = jest.fn(() => new Promise(
      function(resolve, reject) {
        resolve([[{}]])
      }
    ));
  });
  
  test('Users global statistics test', () => {
    const expectedResult = {
      "eventTypesSum": [{}],
      "gendersSum": [{}],
      "rolesSum": [{}],
      "usersSum": [{}],
      "ofPeriod": "all",
    }

    
    return service.get_users_statistics(db).then(userStatistics => {
      expect(db.sequelize.query.mock.calls.length).toBe(4); 
      expect(userStatistics).toStrictEqual(expectedResult);
    });
  });
  
  test('Headhunters global statistics test', () => {
    const expectedResult =  {
      "ofPeriod": "all",
      "offersSum": [{}],
    }

    return service.get_headhunter_statistics(db).then(headhunterStatistics => {
      expect(db.sequelize.query.mock.calls.length).toBe(1);  
      expect(headhunterStatistics).toStrictEqual(expectedResult);
    });
  });

  test('Marketplaces globa statistics', () => {
    const expectedResult = {
      "eventTypesSum": [{}],
      "ofPeriod": "all",
    }

    return service.get_marketplace_statistics(db).then(marketplaceStatistics => {
      expect(db.sequelize.query.mock.calls.length).toBe(2); 
      expect(marketplaceStatistics).toStrictEqual(expectedResult);
    });
  });

  test('Users period statistics test', () => {
    const from = "2020-04-28T00:00:00.000000Z";
    const to = "2020-04-30T00:00:00.000000Z";
    const expectedResult = {
      "eventTypesSum": [{}],
      "gendersSum": [{}],     
      "rolesSum": [{}],
      "usersSum": [{}],
      "ofPeriod": "2020-04-28T00:00:00.000000Z=2020-04-30T00:00:00.000000Z",
    }

    return service.get_users_statistics_period(db, from, to).then(userStatistics => {
      expect(db.sequelize.query.mock.calls.length).toBe(4); 
      expect(userStatistics).toStrictEqual(expectedResult);
    });
  });
  
  test('Headhunters period statistics test', () => {
    const from = "2020-04-20T00:00:00.000000Z";
    const to = "2020-04-26T00:00:00.000000Z";
    const expectedResult = {
      "offersSum": [{}],
      "ofPeriod": "2020-04-20T00:00:00.000000Z=2020-04-26T00:00:00.000000Z",
    }

    return service.get_headhunter_statistics_period(db, from, to).then(headhunterStatistics => {
      expect(db.sequelize.query.mock.calls.length).toBe(1); 
      expect(headhunterStatistics).toStrictEqual(expectedResult);
    });
  });

  test('Marketplaces period statistics', () => {
    const from = "2020-04-28T00:00:00.000000Z";
    const to = "2020-04-30T00:00:00.000000Z";
    const expectedResult = {
      "eventTypesSum": [{}],
      "ofPeriod": "2020-04-28T00:00:00.000000Z=2020-04-30T00:00:00.000000Z",
    }

    return service.get_marketplace_statistics_period(db, from, to).then(marketplaceStatistics => {
      expect(db.sequelize.query.mock.calls.length).toBe(2);
      expect(marketplaceStatistics).toStrictEqual(expectedResult);
    });
  });
});