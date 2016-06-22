import { expect } from 'chai';
import { serializeObject } from '../src/utils';

describe('Utils', () => {
  it('serializeObject', () => {
    const sendData = {
      sensor: false,
      foo: 'bar',
    };

    const result = serializeObject(sendData);
    expect(result).to.equal('sensor=false&foo=bar');
  });
});
