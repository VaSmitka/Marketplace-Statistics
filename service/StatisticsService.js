'use strict';


/**
 * Gets global headhunter statistics.
 *
 * returns HeadhunterStatistics
 **/
exports.get_headhunter_statistics = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "offersSum" : [ {
    "headhunterId" : 0,
    "offersOpenSum" : 6,
    "offersCloseSum" : 1
  }, {
    "headhunterId" : 0,
    "offersOpenSum" : 6,
    "offersCloseSum" : 1
  } ],
  "ofPeriod" : "ofPeriod"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Gets global headhunter statistics of the period.
 *
 * from String 
 * to String 
 * returns HeadhunterStatistics
 **/
exports.get_headhunter_statistics_period = function(from,to) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "offersSum" : [ {
    "headhunterId" : 0,
    "offersOpenSum" : 6,
    "offersCloseSum" : 1
  }, {
    "headhunterId" : 0,
    "offersOpenSum" : 6,
    "offersCloseSum" : 1
  } ],
  "ofPeriod" : "ofPeriod"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Gets global marketplace statistics.
 *
 * returns MarketplaceStatistics
 **/
exports.get_marketplace_statistics = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "offersSum" : 0,
  "companiesSum" : 1,
  "eventTypesSum" : [ {
    "sum" : 0,
    "eventType" : "eventType"
  }, {
    "sum" : 0,
    "eventType" : "eventType"
  } ],
  "ofPeriod" : "ofPeriod",
  "headhuntersSum" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Gets global marketplace statistics of the period.
 *
 * from String 
 * to String 
 * returns MarketplaceStatistics
 **/
exports.get_marketplace_statistics_period = function(from,to) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "offersSum" : 0,
  "companiesSum" : 1,
  "eventTypesSum" : [ {
    "sum" : 0,
    "eventType" : "eventType"
  }, {
    "sum" : 0,
    "eventType" : "eventType"
  } ],
  "ofPeriod" : "ofPeriod",
  "headhuntersSum" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Gets global users statistics.
 *
 * returns UsersStatistics
 **/
exports.get_users_statistics = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "rolesSum" : [ {
    "sum" : 5,
    "roleType" : "roleType"
  }, {
    "sum" : 5,
    "roleType" : "roleType"
  } ],
  "usersSum" : 6,
  "eventTypesSum" : [ {
    "sum" : 0,
    "eventType" : "eventType"
  }, {
    "sum" : 0,
    "eventType" : "eventType"
  } ],
  "gendersSum" : [ {
    "sum" : 1,
    "genderType" : "genderType"
  }, {
    "sum" : 1,
    "genderType" : "genderType"
  } ],
  "ofPeriod" : "ofPeriod"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Gets global users statistics of the period.
 *
 * from String 
 * to String 
 * returns UsersStatistics
 **/
exports.get_users_statistics_period = function(from,to) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "rolesSum" : [ {
    "sum" : 5,
    "roleType" : "roleType"
  }, {
    "sum" : 5,
    "roleType" : "roleType"
  } ],
  "usersSum" : 6,
  "eventTypesSum" : [ {
    "sum" : 0,
    "eventType" : "eventType"
  }, {
    "sum" : 0,
    "eventType" : "eventType"
  } ],
  "gendersSum" : [ {
    "sum" : 1,
    "genderType" : "genderType"
  }, {
    "sum" : 1,
    "genderType" : "genderType"
  } ],
  "ofPeriod" : "ofPeriod"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

