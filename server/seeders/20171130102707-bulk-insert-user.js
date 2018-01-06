module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [
      {
        firstName: 'Admin',
        surname: 'Daisy',
        email: 'admin@daisy.io',
        password:
          '$2a$10$aUPZWqn99cU8o61.lyqaTed.CXkUwHl8j6orAhLRCvznia9cZXMvy',
        isAdmin: true,
        updatedAt: new Date(),
        createdAt: new Date()
      }
    ]),
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
