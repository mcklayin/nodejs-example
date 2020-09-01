const request = require('supertest');
const app = require('../app');

describe('Post Records Endpoints', () => {
  it('should filter records by params', async () => {
    const res = await request(app)
      .post('/records')
      .send({
        startDate: '2016-01-26',
        endDate: '2018-02-02',
        minCount: 2700,
        maxCount: 3000,
      });

    const record = {
      key: 'pxClAvll',
      createdAt: '2016-12-19T10:00:40.050Z',
      totalCount: 2772,
    };
    expect(res.statusCode).toEqual(200);
    expect(res.body.records).toContainEqual(record);
  });

  it('should return empty records', async () => {
    const res = await request(app)
      .post('/records')
      .send({
        startDate: '2125-01-26',
        endDate: '2128-02-02',
        minCount: 2700,
        maxCount: 3000,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.records).toEqual([]);
  });

  it('should return validation startDate & endDate errors', async () => {
    const res = await request(app)
      .post('/records')
      .send({
        startDate: '2125-01-261',
        endDate: '21281-02-022',
        minCount: 2700,
        maxCount: 3000,
      });

    expect(res.statusCode).toEqual(422);
    expect(res.body.code).toEqual(422);
    expect(res.body).toHaveProperty('msg');
    expect(Array.isArray(res.body.msg)).toBe(true);

    const expected = [
      'startDate with value 2125-01-261 fails to match the required pattern: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/',
      'endDate with value 21281-02-022 fails to match the required pattern: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/',
    ];

    expect(res.body.msg).toEqual(expected);
  });

  it('should return validation minCount & maxCount errors. Should be numbers', async () => {
    const res = await request(app)
      .post('/records')
      .send({
        startDate: '2016-01-21',
        endDate: '2018-02-02',
        minCount: 'ss2222',
        maxCount: 'sdsds',
      });

    expect(res.statusCode).toEqual(422);
    expect(res.body.code).toEqual(422);
    expect(res.body).toHaveProperty('msg');
    expect(Array.isArray(res.body.msg)).toBe(true);

    const expected = [
      'minCount must be a number',
      'maxCount must be a number',
    ];

    expect(res.body.msg).toEqual(expected);
  });

  it('should return validation startDate error. Field is required', async () => {
    const res = await request(app)
      .post('/records')
      .send({
        endDate: '2018-02-02',
        minCount: 2500,
        maxCount: 3700,
      });

    expect(res.statusCode).toEqual(422);
    expect(res.body.code).toEqual(422);
    expect(res.body).toHaveProperty('msg');
    expect(Array.isArray(res.body.msg)).toBe(true);

    const expected = [
      'startDate is required',
    ];

    expect(res.body.msg).toEqual(expected);
  });

  it('should return validation error. Field sort is not allowed', async () => {
    const res = await request(app)
      .post('/records')
      .send({
        sort: 'asc',
        startDate: '2016-01-21',
        endDate: '2018-02-02',
        minCount: 2500,
        maxCount: 3700,
      });

    expect(res.statusCode).toEqual(422);
    expect(res.body.code).toEqual(422);
    expect(res.body).toHaveProperty('msg');
    expect(Array.isArray(res.body.msg)).toBe(true);

    const expected = [
      'sort is not allowed',
    ];

    expect(res.body.msg).toEqual(expected);
  });
});
