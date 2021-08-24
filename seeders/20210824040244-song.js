'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Songs', [
      {
        kpopGroupName: 'BTS',
        bestSongName: 'Fly to my room',
        okSongName: 'Permission to dance',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kpopGroupName: '2NE1',
        bestSongName: 'Lonely',
        okSongName: 'Ugly',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Songs', null, {});
  }
};
