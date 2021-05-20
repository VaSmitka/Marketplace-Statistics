'use strict';

exports.UsersEvents = (dbTable, data) => {
  const saveEvent = new Promise((resolve, reject) => {
    resolve(dbTable.create({
      eventType: data.eventType,
      userId: data.payload.id,
      gender: data.payload.gender,
      role: data.payload.role,
      acountCreated: data.payload.createdAt
    }));
  })
  .then(() => console.log('Event is saved', data))
  .catch((err) => console.error('Error: ', error));
}

exports.MarketplaceEvents = (dbTable, data) => {
  const saveEvent = new Promise((resolve, reject) => {
    resolve(dbTable.create({
      eventType: data.eventType,
      offerId: data.payload.id,
      posterId: data.payload.poster.id,
      companyName: data.payload.companyName,
      offerCreated: data.payload.dateCreated,
      offerClosed: data.payload.dateClosed
    }));
  })
  .then(() => console.log('Event is saved', data))
  .catch((err) => console.error('Error: ', error));
}