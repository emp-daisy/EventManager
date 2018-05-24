module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [
      {
        firstName: 'Admin',
        surname: 'Daisy',
        email: 'admin@daisy.io',
        password:
          '$2a$10$SJpeT.Y6.aSNidAvY/3cO.kvvSBcQZs641b1.CgIvP4GXur1q2kDu',
        isAdmin: true,
        updatedAt: new Date(),
        createdAt: new Date()
      }, {
        firstName: 'Non-Admin',
        surname: 'Daisy',
        email: 'empress@daisy.io',
        password:
          '$2a$10$SJpeT.Y6.aSNidAvY/3cO.kvvSBcQZs641b1.CgIvP4GXur1q2kDu',
        isAdmin: true,
        updatedAt: new Date(),
        createdAt: new Date()
      }
    ]),
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
