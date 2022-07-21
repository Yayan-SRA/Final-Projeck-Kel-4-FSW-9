'use strict';

const bcrypt = require("bcrypt")
const encryptPassword = (password) => {
  return bcrypt.hashSync(password, 10);
}

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [{
      nama: "Sofyan Rizki Afandy",
      email: "yayansra123@gmail.com",
      password: encryptPassword("Cobacoba1"),
      kota: "Tuban",
      alamat: "Kecamatan Merakurak",
      nomor_hp: "087862477187",
      image: "http://res.cloudinary.com/dt3pzvmfg/image/upload/v1658204189/wakqrf3i3a2e2esxzztq.png",
      verifikasi: "1",
      refresh_token: null,
      OTP: "4234",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nama: "YayanSRA",
      email: "yayansra14@gmail.com",
      password: encryptPassword("Cobacoba2"),
      kota: "Semarang",
      alamat: "Kecamatan Gunungpati",
      nomor_hp: "087862477187",
      image: "http://res.cloudinary.com/dt3pzvmfg/image/upload/v1658238474/zgkw3a6tmwmbbbombwbo.jpg",
      verifikasi: "1",
      refresh_token: null,
      OTP: "4534",
      createdAt: new Date(),
      updatedAt: new Date(),
    }],
      {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  }
};
