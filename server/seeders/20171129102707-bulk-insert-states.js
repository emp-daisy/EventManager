module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('States', [
      {
        name: 'Abia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Adamawa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Akwa Ibom',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Anambra',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bauchi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bayelsa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Benue',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Borno',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cross River',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Delta',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ebonyi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Edo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ekiti',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Enugu',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'FCT',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gombe',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Imo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jigawa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kaduna',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kano',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Katsina',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kebbi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kogi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kwara',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lagos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nasarawa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Niger',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ogun',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ondo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Osun',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Oyo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Plateau',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Rivers',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sokoto',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Taraba',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Yobe',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Zamfara',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]),
  down: queryInterface =>
    queryInterface.bulkDelete('States', null, {})
};
