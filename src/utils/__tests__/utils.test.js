import { serializeObject } from '../utils';

describe('Utils', () => {
  it('should return serialized string', () => {
    const sendData = {
      sensor: false,
      foo: 'bar',
    };
    const result = serializeObject(sendData);

    expect(result).toBe('sensor=false&foo=bar');
  });
});
