'use strict';

var utils = require('../utils/writer.js');
var Statistics = require('../service/StatisticsService');

module.exports.get_headhunter_statistics = function get_headhunter_statistics (req, res, next) {
  Statistics.get_headhunter_statistics(req.app.db)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_headhunter_statistics_period = function get_headhunter_statistics_period (req, res, next, from, to) {
  Statistics.get_headhunter_statistics_period(req.app.db, from, to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_marketplace_statistics = function get_marketplace_statistics (req, res, next) {
  Statistics.get_marketplace_statistics(req.app.db)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_marketplace_statistics_period = function get_marketplace_statistics_period (req, res, next, from, to) {
  Statistics.get_marketplace_statistics_period(req.app.db, from, to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_users_statistics = function get_users_statistics (req, res, next) {
  Statistics.get_users_statistics(req.app.db)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_users_statistics_period = function get_users_statistics_period (req, res, next, from, to) {
  Statistics.get_users_statistics_period(req.app.db, from, to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
