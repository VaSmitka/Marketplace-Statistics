'use strict';

var { Op } = require("sequelize");

/**
 * Gets global headhunter statistics.
 *
 * returns HeadhunterStatistics
 **/
exports.get_headhunter_statistics = function(db) {
  return new Promise(function(resolve, reject) {
    db.sequelize.query(
      `SELECT 
        CASE
          WHEN c."posterId" IS NOT NULL THEN c."posterId"
          ELSE nc."posterId"
        END AS "posterId",
        c."offersCloseSum" as "offersCloseSum",
        nc."offersOpenSum" as "offersOpenSum"
      FROM (
        SELECT "posterId", COUNT(*) AS "offersCloseSum"
        FROM "MarketplaceEvents" 
        WHERE "offerClosed" IS NOT NULL 
        GROUP BY "posterId"
      ) AS c
      FULL OUTER JOIN (
        SELECT "posterId", COUNT(*) AS "offersOpenSum"
        FROM "MarketplaceEvents" 
        WHERE "offerClosed" IS NULL 
        GROUP BY "posterId"
      ) AS nc
      ON c."posterId"=nc."posterId";`
    )
    .then(stats => {
      var data = {};
      data.ofPeriod = 'all';
      data.offersSum = stats[0];
      resolve(data)
    })
    .catch(error => reject(error));
  });
}


/**
 * Gets global headhunter statistics of the period.
 *
 * from String 
 * to String 
 * returns HeadhunterStatistics
 **/
exports.get_headhunter_statistics_period = function(db, from,to) {
  return new Promise(function(resolve, reject) {
    db.sequelize.query(
      `SELECT 
        CASE
          WHEN c."posterId" IS NOT NULL THEN c."posterId"
          ELSE nc."posterId"
        END AS "posterId",
        c."offersCloseSum" as "offersCloseSum",
        nc."offersOpenSum" as "offersOpenSum"
      FROM (
        SELECT "posterId", COUNT(*) AS "offersCloseSum"
        FROM "MarketplaceEvents" 
        WHERE "offerClosed" IS NOT NULL AND ${from} <= "offerClosed" AND "offerClosed" <= ${to}
        GROUP BY "posterId"
      ) AS c
      FULL OUTER JOIN (
        SELECT "posterId", COUNT(*) AS "offersOpenSum"
        FROM "MarketplaceEvents" 
        WHERE "offerClosed" IS NULL AND ${from} <= "offerCreated" AND "offerCreated" <= ${to}
        GROUP BY "posterId"
      ) AS nc
      ON c."posterId"=nc."posterId";`
    )
    .then(stats => {
      var data = {};
      data.ofPeriod =  from + '=' + to;
      data.offersSum = stats[0];
      resolve(data)
    })
    .catch(error => reject(error));
  });
}


/**
 * Gets global marketplace statistics.
 *
 * returns MarketplaceStatistics
 **/
exports.get_marketplace_statistics = function(db) {
  return new Promise(function(resolve, reject) {
    db.sequelize.query(
      `SELECT 
        COUNT(DISTINCT "companyName") as "companiesSum", 
        COUNT(*) as "offersSum", 
        COUNT(DISTINCT "posterId") as "headhuntersSum" 
      FROM "MarketplaceEvents";`
    )
    .then(stats => 
      db.sequelize.query(
        `SELECT "eventType", COUNT(*) as "sum" 
        FROM "MarketplaceEvents" 
        GROUP BY "eventType";`
      )
      .then(eventTypes => {
        var data = stats[0][0];
        data.ofPeriod = 'all';
        data.eventTypesSum = eventTypes[0];
        resolve(data)
      })
      .catch(error => reject(error))
    )
    .catch(error => reject(error));
  });
}


/**
 * Gets global marketplace statistics of the period.
 *
 * from String 
 * to String 
 * returns MarketplaceStatistics
 **/
exports.get_marketplace_statistics_period = function(db, from,to) {
  return new Promise(function(resolve, reject) {
    db.sequelize.query(
      `SELECT 
        COUNT(DISTINCT "companyName") as "companiesSum", 
        COUNT(*) as "offersSum", 
        COUNT(DISTINCT "posterId") as "headhuntersSum" 
      FROM "MarketplaceEvents"
      WHERE  ${from} <= "offerCreated" AND "offerCreated" <= ${to};`
    )
    .then(stats => 
      db.sequelize.query(
        `SELECT "eventType", COUNT(*) as "sum" 
        FROM "MarketplaceEvents" 
        WHERE  ${from} <= "offerCreated" AND "offerCreated" <= ${to}
        GROUP BY "eventType";`
      )
      .then(eventTypes => {
        var data = stats[0][0];
        data.ofPeriod = from + '=' + to;
        data.eventTypesSum = eventTypes[0];
        resolve(data)
      })
      .catch(error => reject(error))
    )
    .catch(error => reject(error));
  });
}


/**
 * Gets global users statistics.
 *
 * returns UsersStatistics
 **/
exports.get_users_statistics = function(db) {
  return new Promise(function(resolve, reject) {
    db.sequelize.query(
      `SELECT "role" AS "roleType", COUNT(*) as "sum" 
      FROM "UsersEvents" 
      GROUP BY "role";`
    )
    .then(roles => 
      db.sequelize.query(
        `SELECT "eventType", COUNT(*) as "sum" 
        FROM "UsersEvents" 
        GROUP BY "eventType";`
      )
      .then(eventTypes => {
        db.sequelize.query(
          `SELECT "gender" AS "genderType", COUNT(*) as "sum" 
          FROM "UsersEvents" 
          GROUP BY "gender";`
        )
        .then(genders => {
          db.sequelize.query(
            `SELECT COUNT(DISTINCT "userId") as "usersSum" 
            FROM "UsersEvents";`
          )
          .then(users => {
            var data = {};
            data.ofPeriod = 'all';
            data.rolesSum = roles[0];
            data.eventTypesSum = eventTypes[0];
            data.gendersSum = genders[0];
            data.usersSum = users[0]
            resolve(data)
          })
          .catch(error => reject(error))
        })
        .catch(error => reject(error))
      })
      .catch(error => reject(error))
    )
    .catch(error => reject(error));
  });
}


/**
 * Gets global users statistics of the period.
 *
 * from String 
 * to String 
 * returns UsersStatistics
 **/
exports.get_users_statistics_period = function(db, from,to) {
  return new Promise(function(resolve, reject) {
    db.sequelize.query(
      `SELECT "role" AS "roleType", COUNT(*) as "sum" 
      FROM "UsersEvents" 
      WHERE  ${from} <= "offerCreated" AND "offerCreated" <= ${to}
      GROUP BY "role";`
    )
    .then(roles => 
      db.sequelize.query(
        `SELECT "eventType", COUNT(*) as "sum" 
        FROM "UsersEvents"
        WHERE  ${from} <= "offerCreated" AND "offerCreated" <= ${to} 
        GROUP BY "eventType";`
      )
      .then(eventTypes => {
        db.sequelize.query(
          `SELECT "gender" AS "genderType", COUNT(*) as "sum" 
          FROM "UsersEvents"
          WHERE  ${from} <= "offerCreated" AND "offerCreated" <= ${to} 
          GROUP BY "gender";`
        )
        .then(genders => {
          db.sequelize.query(
            `SELECT COUNT(DISTINCT "userId") as "usersSum" 
            FROM "UsersEvents"
            WHERE  ${from} <= "offerCreated" AND "offerCreated" <= ${to};`
          )
          .then(users => {
            var data = {};
            data.ofPeriod = from + '=' + to;
            data.rolesSum = roles[0];
            data.eventTypesSum = eventTypes[0];
            data.gendersSum = genders[0];
            data.usersSum = users[0]
            resolve(data)
          })
          .catch(error => reject(error))
        })
        .catch(error => reject(error))
      })
      .catch(error => reject(error))
    )
    .catch(error => reject(error));
  });
}
