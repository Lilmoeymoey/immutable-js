///<reference path='../resources/jest.d.ts'/>
jest.autoMockOff();
import I = require('../dist/Immutable');

describe('count', () => {

  it('counts sequences with known lengths', () => {
    expect(I.Sequence(1,2,3,4,5).length).toBe(5);
    expect(I.Sequence(1,2,3,4,5).count()).toBe(5);
  })

  it('counts sequences with unknown lengths, resulting in a cached length', () => {
    var seq = I.Sequence(1,2,3,4,5,6).filter(x => x % 2 === 0);
    expect(seq.length).toBe(undefined);
    expect(seq.count()).toBe(3);
    expect(seq.length).toBe(3);
  })

  it('counts sequences with a specific predicate', () => {
    var seq = I.Sequence(1,2,3,4,5,6);
    expect(seq.length).toBe(6);
    expect(seq.count(x => x > 3)).toBe(3);
  })

  it('counts by keyed sequence', () => {
    var grouped = I.Sequence({a:1,b:2,c:3,d:4}).countBy(x => x % 2);
    expect(grouped.toJS()).toEqual({1:2, 0:2});
    expect(grouped.get(1)).toEqual(2);
  })

  it('counts by indexed sequence', () => {
    expect(
      I.Sequence(1,2,3,4,5,6).countBy(x => x % 2).toJS()
    ).toEqual(
      {1:3, 0:3}
    );
  })

  it('counts by specific keys', () => {
    expect(
      I.Sequence(1,2,3,4,5,6).countBy(x => x % 2 ? 'odd' : 'even').toJS()
    ).toEqual(
      {odd:3, even:3}
    );
  })

})
