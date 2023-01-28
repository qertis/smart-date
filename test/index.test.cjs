const test = require('node:test');
const assert = require('node:assert/strict');
const {isValidDate, convertToNormalDate, checkDateLaterThanNow} = require('../index.cjs');

test('SmartDate', async (t) => {
  test('Is valid date', () => {
    assert.equal(isValidDate('1.1.2016'), true);
    assert.equal(isValidDate('01.01.2016'), true);
    assert.equal(isValidDate('13.13.2016'), false);
    assert.equal(isValidDate('31.13.2017'), false);
    assert.equal(isValidDate('32.12.2017'), false);
  });

  test('Convert to normal date', () => {
    assert.equal(typeof convertToNormalDate('2016-12-3'), 'object');
    assert.equal(convertToNormalDate('2016-3-12') instanceof Date, true);
    assert.equal(convertToNormalDate('13/07/2019') instanceof Date, true);
    assert.equal(convertToNormalDate(new Date()) instanceof Date, true);
    assert.equal(convertToNormalDate('2016-01.02').getFullYear(), 2016);
    assert.equal(convertToNormalDate('2017-07-08').getDate(), 8);
    assert.equal(convertToNormalDate('2017-08-07').getDate(), 7);
    assert.equal(convertToNormalDate('2017-08-07').getMonth(), 8);
    assert.throws(
      () => {
        convertToNormalDate('2017-27-2');
      },
    );
    assert.equal(convertToNormalDate(new Date(0)).getMonth(), 0);
    assert.equal(convertToNormalDate(new Date(0)).toDateString(), 'Thu Jan 01 1970');
  });

  test('Check date later than now', () => {
    assert.equal(checkDateLaterThanNow(new Date(0)), false);
    assert.equal(checkDateLaterThanNow(new Date('07.12.2016')), false);
    assert.equal(checkDateLaterThanNow(new Date('31.12.2001')), false);
    assert.equal(checkDateLaterThanNow(new Date('32.12.2016')), false);
    assert.equal(checkDateLaterThanNow(new Date()), false);
  });
});
