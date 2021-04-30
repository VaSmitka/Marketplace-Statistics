'use strict';

var utils = require('../utils/writer.js');
var Events = require('../service/EventsService');

module.exports.add_event = function add_event (req, res, next, body, eventType) {
  Events.add_event(body, eventType)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
