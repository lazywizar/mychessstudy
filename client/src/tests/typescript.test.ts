describe('TypeScript Configuration', () => {
  test('TypeScript types are working correctly', () => {
    // Define a simple interface
    interface TestInterface {
      name: string;
      value: number;
    }

    // Create an object that implements the interface
    const testObject: TestInterface = {
      name: 'test',
      value: 42
    };

    // Verify the types are working
    expect(typeof testObject.name).toBe('string');
    expect(typeof testObject.value).toBe('number');
  });

  test('can import TypeScript modules', () => {
    // Verify that we can import TypeScript files
    expect(() => require('../App')).not.toThrow();
  });
});
