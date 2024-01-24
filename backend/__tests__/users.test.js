const {
  describe, test, expect, afterAll, beforeEach, beforeAll,
} = require('@jest/globals');
const supertest = require('supertest');

const connection = require('../db/pool');

const app = require('../app');

describe('POST users endpoint', () => {
  beforeAll(async () => {
    const deleteQuery = 'DELETE FROM users WHERE email = ?;';
    connection.query(deleteQuery, ['test@test.com'], (err, result) => {
      if (err) {
        console.log(err);
      }
    });
  });

  test('POST /signup', async () => {
    const res = await supertest(app)
      .post('/api/users/signup')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .send({
        name: 'test',
        email: 'test@test.com',
        password: 'test123',
      });
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.status).toEqual(201);
    expect(res.body.id).toBeTruthy();
    expect(res.body.email).toBeTruthy();
    expect(res.body.token).toBeTruthy();
  });

  test('POST /login', async () => {
    const res = await supertest(app)
      .post('/api/users/login')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .send({
        email: 'test@test.com',
        password: 'test123',
      });
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.status).toEqual(201);
    expect(res.body.id).toBeTruthy();
    expect(res.body.email).toBeTruthy();
    expect(res.body.token).toBeTruthy();
  });

  test('POST /login with wrong password', async () => {
    const res = await supertest(app)
      .post('/api/users/login')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .send({
        email: 'test@test.com',
        password: 'test1234',
      });
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.status).toEqual(401);
    expect(res.body.error).toEqual('Could not identify user, credetials might be wrong');
  });

  test('POST /login with wrong email', async () => {
    const res = await supertest(app)
      .post('/api/users/login')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .send({
        email: 'tes@test.com',
        password: 'test123',
      });
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.status).toEqual(401);
    expect(res.body.error).toEqual('Could not identify user, credetials might be wrong');
  });
});
