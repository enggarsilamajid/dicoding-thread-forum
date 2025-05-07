/**
 * - Login spec
 *  - should display login page correctly
 *  - should display alert when email is empty
 *  - should display alert when password is empty
 *  - should display alert when email or password are wrong
 *  - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Kata Sandi"]').should('be.visible');
    cy.get('button').contains(/^Kirim$/).should('be.visible');
  });

  it('should display alert when email is empty', () => {
    // klik tombol login tanpa mengisi email
    cy.get('button').contains(/^Kirim$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    // mengisi email
    cy.get('input[placeholder="Email"]').type('testuser');

    // klik tombol login tanpa mengisi password
    cy.get('button').contains(/^Kirim$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email or password are wrong', () => {
    // mengisi email
    cy.get('input[placeholder="Email"]').type('akunTesting1@gmail.com');

    // mengisi password yang salah
    cy.get('input[placeholder="Kata Sandi"]').type('wrong_password');

    // klik tombol login tanpa mengisi password
    cy.get('button').contains(/^Kirim$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when email and password are correct', () => {
    // mengisi email
    cy.get('input[placeholder="Email"]').type('akunTesting1@gmail.com');

    // mengisi password
    cy.get('input[placeholder="Kata Sandi"]').type('akunTesting1');

    // klik tombol login
    cy.get('button').contains(/^Kirim$/).click();

    // tunggu URL berubah
    cy.url().should('include', '/home');

    // verifikasi tombol-tombol muncul
    cy.get('nav').contains(/^HOME$/).should('be.visible');
    cy.get('nav').contains(/^LEADERBOARD$/).should('be.visible');
    cy.get('nav').contains(/^LOGOUT$/).should('be.visible');
  });
});