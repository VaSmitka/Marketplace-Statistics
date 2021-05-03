const myBeverage = {
  delicious: true,
  sour: false,
};

describe('unit test jest', () => {
  test('is delicious', () => {
    expect(myBeverage.delicious).toBeTruthy();
  });

  test('is not sour', () => {
    expect(myBeverage.sour).toBeFalsy();
  });
});