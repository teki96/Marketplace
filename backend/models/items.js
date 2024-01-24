const db = require('../db/pool');

const items = {
  findAll: () => new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      connection.query('SELECT * FROM items;', (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  create: (item) => new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      connection.query('INSERT INTO items SET ?;', item, (err, result) => {
        connection.release();
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }),
  findByItem: (item) => new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      const selectQuery = 'SELECT * FROM items WHERE title LIKE ? OR description LIKE ?;';
      connection.query(selectQuery, item, (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  findById: (id) => new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      const selectQuery = 'SELECT * FROM items WHERE id = ?;';
      connection.query(selectQuery, id, (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  findByOwnerId: (ownerId) => new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      const selectQuery = 'SELECT * FROM items WHERE ownerId = ?;';
      connection.query(selectQuery, ownerId, (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  updateById: (id, item) => new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      const selectQuery = 'UPDATE items SET ? WHERE id = ?;';
      connection.query(selectQuery, [item, id], (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  deleteById: (id) => new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      const selectQuery = 'DELETE FROM items WHERE id = ?;';
      connection.query(selectQuery, id, (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
};

module.exports = items;
