'use strict';


/**
 * Gets new offers in time.
 *
 * returns List
 **/
exports.get_all_new_offers = function(db) {
  return new Promise(function(resolve, reject) {
    db['MarketplaceEvents'].findAll()
      .then(offers => resolve(offers))
      .catch(error => reject(error));
    
    /*var examples = {};
    examples['application/json'] = [ {
      "offers" : [ {
        "positionName" : "positionName",
        "createdAt" : "2000-01-23T04:56:07.000+00:00",
        "headhunter" : 6,
        "companyName" : "companyName",
        "offerId" : 0
      }, {
        "positionName" : "positionName",
        "createdAt" : "2000-01-23T04:56:07.000+00:00",
        "headhunter" : 6,
        "companyName" : "companyName",
        "offerId" : 0
      } ]
    }, {
      "offers" : [ {
        "positionName" : "positionName",
        "createdAt" : "2000-01-23T04:56:07.000+00:00",
        "headhunter" : 6,
        "companyName" : "companyName",
        "offerId" : 0
      }, {
        "positionName" : "positionName",
        "createdAt" : "2000-01-23T04:56:07.000+00:00",
        "headhunter" : 6,
        "companyName" : "companyName",
        "offerId" : 0
      } ]
    } ];

    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }*/
  });
}


/**
 * Gets all basic statistics.
 *
 * returns List
 **/
exports.get_basic_statistics = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "numberOfOffers" : 1,
  "ratioOfHeadhunresToUsers" : 7.061401241503109,
  "numberOfUsers" : 6,
  "ratioOfSuccessfulToUnsuccessfulOffers" : 2.3021358869347655,
  "numberOfHeadhusters" : 0,
  "numberOfFailureCloseOffers" : 5,
  "numberOfSuccessCloseOffers" : 5
}, {
  "numberOfOffers" : 1,
  "ratioOfHeadhunresToUsers" : 7.061401241503109,
  "numberOfUsers" : 6,
  "ratioOfSuccessfulToUnsuccessfulOffers" : 2.3021358869347655,
  "numberOfHeadhusters" : 0,
  "numberOfFailureCloseOffers" : 5,
  "numberOfSuccessCloseOffers" : 5
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Gets new offers in time for specific headhunter.
 *
 * id Integer 
 * returns List
 **/
exports.get_new_offers_headhuner = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "offers" : [ {
    "positionName" : "positionName",
    "createdAt" : "2000-01-23T04:56:07.000+00:00",
    "companyName" : "companyName",
    "offerId" : 6
  }, {
    "positionName" : "positionName",
    "createdAt" : "2000-01-23T04:56:07.000+00:00",
    "companyName" : "companyName",
    "offerId" : 6
  } ],
  "headhunter" : 0
}, {
  "offers" : [ {
    "positionName" : "positionName",
    "createdAt" : "2000-01-23T04:56:07.000+00:00",
    "companyName" : "companyName",
    "offerId" : 6
  }, {
    "positionName" : "positionName",
    "createdAt" : "2000-01-23T04:56:07.000+00:00",
    "companyName" : "companyName",
    "offerId" : 6
  } ],
  "headhunter" : 0
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

