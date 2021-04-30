'use strict';

var utils = require('../utils/writer.js');
var Statistics = require('../service/StatisticsService');

module.exports.get_all_new_offers = function get_all_new_offers (req, res, next) {
  Statistics.get_all_new_offers()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_basic_statistics = function get_basic_statistics (req, res, next) {
  Statistics.get_basic_statistics()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_new_offers_headhuner = function get_new_offers_headhuner (req, res, next, id) {
  Statistics.get_new_offers_headhuner(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
