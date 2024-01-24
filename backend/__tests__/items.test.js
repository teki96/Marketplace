const {
  describe, test, expect, afterAll, beforeAll,
} = require('@jest/globals');
const supertest = require('supertest');

const connection = require('../db/pool');

const app = require('../app');

describe('GET items endpoint', () => {
  test('should return all items', async () => {
    const res = await supertest(app)
      .get('/api/items')
      .set('Accept', 'application/json')
      .set('Content', 'application/json');
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.status).toEqual(200);
    expect(res.body.length).toEqual(4);
  });

  test('should return an item by id', async () => {
    const res = await supertest(app)
      .get('/api/items/3b480158-dec6-11ed-9023-0242ac160003')
      .set('Accept', 'application/json')
      .set('Content', 'application/json');
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.status).toEqual(200);
    expect(res.body[0].id).toEqual('3b480158-dec6-11ed-9023-0242ac160003');
    expect(res.body[0].title).toEqual('Book');
    expect(res.body[0].description).toEqual('A great book');
    expect(res.body[0].image).toEqual('https://www.stockvault.net/data/2009/10/28/111363/thumb16.jpg');
    expect(res.body[0].price).toEqual('10.99');
  });
});

describe('POST items endpoint', () => {
  const loggedInUser = {
    id: '',
    email: '',
    token: '',
  };

  beforeAll(async () => {
    connection.query('DELETE FROM users WHERE email = ?;', ['test@test.com']);

    const res = await supertest(app)
      .post('/api/users/signup')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .send({
        name: 'test',
        email: 'test@test.com',
        password: 'test123',
      });
    loggedInUser.id = res.body.id;
    loggedInUser.email = res.body.email;
    loggedInUser.token = res.body.token;
  });

  afterAll(async () => {
    const deleteQuery = 'DELETE FROM items WHERE title LIKE \'Test Item\' AND description LIKE \'Test Description\';';
    connection.query(deleteQuery, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
  });

  test('should create a new item', async () => {
    const res = await supertest(app)
      .post('/api/items')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .send({
        title: 'Test Item',
        description: 'Test Description',
        image: 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg',
        price: '10.99',
        ownerId: loggedInUser.id,
      });
    expect(res.headers['content-type']).toMatch('application/json; charset=utf-8');
    expect(res.status).toEqual(201);
    expect(res.body.id).toBeTruthy();
    expect(res.body.title).toEqual('Test Item');
    expect(res.body.description).toEqual('Test Description');
    expect(res.body.image).toEqual('https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg');
    expect(res.body.price).toEqual('10.99');
    expect(res.body.ownerId).toEqual(loggedInUser.id);
  });

  test('should not create a new item if not logged in', async () => {
    const res = await supertest(app)
      .post('/api/items')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .send({
        title: 'Test Item',
        description: 'Test Description',
        image: 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg',
        price: '10.99',
        ownerId: '',
      });
    expect(res.headers['content-type']).toMatch('application/json; charset=utf-8');
    expect(res.status).toEqual(400);
    expect(res.body.error).toEqual('Owner ID is required');
  });

  test('should not create a new item if title is missing', async () => {
    const res = await supertest(app)
      .post('/api/items')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .send({
        title: '',
        description: 'Test Description',
        image: 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg',
        price: '10.99',
        ownerId: loggedInUser.id,
      });
    expect(res.headers['content-type']).toMatch('application/json; charset=utf-8');
    expect(res.status).toEqual(400);
    expect(res.body.error).toEqual('Title is required');
  });

  test('should not create a new item if description is missing', async () => {
    const res = await supertest(app)
      .post('/api/items')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .send({
        title: 'Test Item',
        description: '',
        image: 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg',
        price: '-10.99',
        ownerId: loggedInUser.id,
      });
    expect(res.headers['content-type']).toMatch('application/json; charset=utf-8');
    expect(res.status).toEqual(400);
    expect(res.body.error).toEqual('Description is required');
  });

  test('should not create a new item if price is missing', async () => {
    const res = await supertest(app)
      .post('/api/items')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .send({
        title: 'Test Item',
        description: 'Test Description',
        image: 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg',
        price: '',
        ownerId: loggedInUser.id,
      });
    expect(res.headers['content-type']).toMatch('application/json; charset=utf-8');
    expect(res.status).toEqual(400);
    expect(res.body.error).toEqual('"price" must be a number');
  });

  test('should not create a new item if price is not a number', async () => {
    const res = await supertest(app)
      .post('/api/items')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .send({
        title: 'Test Item',
        description: 'Test Description',
        image: 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg',
        price: 'test',
        ownerId: loggedInUser.id,
      });
    expect(res.headers['content-type']).toMatch('application/json; charset=utf-8');
    expect(res.status).toEqual(400);
    expect(res.body.error).toEqual('"price" must be a number');
  });
});

describe('DELETE items endpoint', () => {
  const loggedInUser = {
    id: '',
    email: '',
    token: '',
  };

  beforeAll(async () => {
    connection.query('DELETE FROM users WHERE email = ?;', ['test@test.com']);

    const res = await supertest(app)
      .post('/api/users/signup')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .send({
        name: 'test',
        email: 'test@test.com',
        password: 'test123',
      });
    loggedInUser.id = res.body.id;
    loggedInUser.email = res.body.email;
    loggedInUser.token = res.body.token;
  });

  afterAll(async () => {
    const deleteQuery = 'DELETE FROM items WHERE title LIKE \'Test Item\' AND description LIKE \'Test Description\';';
    connection.query(deleteQuery, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
  });

  test('should delete an item by id', async () => {
    const item = {
      title: 'Test Item',
      description: 'Test Description',
      image: 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg',
      price: '10.99',
      ownerId: loggedInUser.id,
    };

    const postResponse = await supertest(app)
      .post('/api/items')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .send(item);

    const itemId = postResponse.body.id;

    const res = await supertest(app)
      .delete('/api/items/${itemId}')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`);
    expect(res.headers['content-type']).toMatch('application/json; charset=utf-8');
    expect(res.status).toEqual(201);
  });
});
