const db = require('../models');
const service = require('../service/StatisticsService');
const usersData = require('./usersTestData.json');
const marketPlaceData = require('./marketplaceTestData.json');

beforeAll(() => {
  // Clears the database and adds some testing data.
  // Jest will wait for this promise to resolve before running tests.
  return db.sequelize.sync({ force: true }).then(async () => { 
    console.log("Drop and re-sync db.");
    await db.UsersEvents.bulkCreate(usersData);
    await db.MarketplaceEvents.bulkCreate(marketPlaceData);
    console.log("Added test data");
  });
});

describe('integration test jest', () => {
  test('Users global statistics test', () => {
    const expectedResult = {
      "eventTypesSum": [
        {
          "eventType": "NEW_USER_ACCOUNT_REGISTERED",
          "sum": "4",
        },
        {
          "eventType": "NEW_USER_ACCOUNT_UPDATE",
          "sum": "1",
        },
      ],
      "gendersSum": [
        {
          "genderType": 2,
          "sum": "2",
        },
        {
          "genderType": 1,
          "sum": "3",
        },
      ],
      "ofPeriod": "all",
      "rolesSum": [
        {
          "roleType": 3,
          "sum": "1",
        },
        {
          "roleType": 2,
          "sum": "3",
        },
        {
          "roleType": 1,
          "sum": "1",
        },
      ],
      "usersSum": [
        {
          "usersSum": "4",
        },
      ],
    }

    return service.get_users_statistics(db).then(userStatistics => 
      expect(userStatistics).toStrictEqual(expectedResult)
    );
  });
  
  test('Headhunters global statistics test', () => {
    const expectedResult =  {
      "ofPeriod": "all",
      "offersSum": [
        {
          "offersCloseSum": "1",
          "offersOpenSum": null,
          "posterId": 4,
        },
        {
          "offersCloseSum": "1",
          "offersOpenSum": null,
          "posterId": 7,
        },
        {
          "offersCloseSum": "2",
          "offersOpenSum": "2",
          "posterId": 5,
        },
        {
          "offersCloseSum": null,
          "offersOpenSum": "1",
          "posterId": 8,
        },
      ],
    }

    return service.get_headhunter_statistics(db).then(headhunterStatistics => 
      expect(headhunterStatistics).toStrictEqual(expectedResult)
    );
  });

  test('Marketplaces globa statistics', () => {
    const expectedResult = {
      "companiesSum": "3",
      "eventTypesSum":[
        {
          "eventType": "JOB_OFFER_CREATED",
          "sum": "5",
        },
        {
          "eventType": "JOB_OFFER_UPDATE",
          "sum": "2",
        },
      ],
      "headhuntersSum": "4",
      "ofPeriod": "all",
      "offersSum": "7",
    }

    return service.get_marketplace_statistics(db).then(marketplaceStatistics => 
      expect(marketplaceStatistics).toStrictEqual(expectedResult)
    );
  });

  test('Users period statistics test', () => {
    const from = "2020-04-28T00:00:00.000000Z";
    const to = "2020-04-30T00:00:00.000000Z";
    const expectedResult = {
        "eventTypesSum": [
          {
            "eventType": "NEW_USER_ACCOUNT_REGISTERED",
          "sum": "1",
        },
      ],
      "gendersSum": [
        {
          "genderType": 1,
          "sum": "1",
        },
      ],
      "ofPeriod": "2020-04-28T00:00:00.000000Z=2020-04-30T00:00:00.000000Z",
      "rolesSum": [
        {
          "roleType": 2,
          "sum": "1",
        },
      ],
      "usersSum": [
        {
          "usersSum": "1",
        },
      ],
    }

    return service.get_users_statistics_period(db, from, to).then(userStatistics => 
      expect(userStatistics).toStrictEqual(expectedResult)
    );
  });
  
  test('Headhunters period statistics test', () => {
    const from = "2020-04-20T00:00:00.000000Z";
    const to = "2020-04-26T00:00:00.000000Z";
    const expectedResult = {
      "ofPeriod": "2020-04-20T00:00:00.000000Z=2020-04-26T00:00:00.000000Z",
      "offersSum": [
        {
          "offersCloseSum": "1",
          "offersOpenSum": null,
          "posterId": 4,
        },
        {
          "offersCloseSum": null,
          "offersOpenSum": "1",
          "posterId": 5,
        },
        {
          "offersCloseSum": "1",
          "offersOpenSum": null,
          "posterId": 7,
        },
      ],
    }

    return service.get_headhunter_statistics_period(db, from, to).then(headhunterStatistics => 
      expect(headhunterStatistics).toStrictEqual(expectedResult)
    );
  });

  test('Marketplaces period statistics', () => {
    const from = "2020-04-28T00:00:00.000000Z";
    const to = "2020-04-30T00:00:00.000000Z";
    const expectedResult = {
      "companiesSum": "1",
      "eventTypesSum": [
        {
          "eventType": "JOB_OFFER_CREATED",
          "sum": "2",
        },
      ],
      "headhuntersSum": "2",
      "ofPeriod": "2020-04-28T00:00:00.000000Z=2020-04-30T00:00:00.000000Z",
      "offersSum": "2",
    }

    return service.get_marketplace_statistics_period(db, from, to).then(marketplaceStatistics => 
      expect(marketplaceStatistics).toStrictEqual(expectedResult)
    );
  });

  afterAll(() => {
    return db.sequelize.connectionManager.close().then(() => console.log('shut down gracefully'));
  });
});