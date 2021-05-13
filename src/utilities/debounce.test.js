import debounce from './debounce';

jest.useFakeTimers();

describe('debounce util', () => {
  const func = jest.fn();

  beforeEach(() => {
    // Reset in case there are more test cases depending on the same mock
    func.mockReset();
  });

  it('should call debounce util', () => {
    const debouncedFunc = debounce(func, 10);
    for (let i = 0; i < 100; i++) {
      // Execute the debounced function
      debouncedFunc();
    }

    // Should not have been called yet since 10ms is not passed
    expect(func).not.toHaveBeenCalled();

    // Fast forward time => 10ms will be passed
    jest.runAllTimers();

    // Now the callback should have been called exactly once
    expect(func).toBeCalledTimes(1);
  });
});
