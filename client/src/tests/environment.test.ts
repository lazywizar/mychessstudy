describe('Environment Configuration', () => {
  test('environment variables are properly loaded', () => {
    // Verify that the environment is set to 'test'
    expect(process.env.NODE_ENV).toBe('test');
  });

  test('tailwind css configuration exists', () => {
    // Instead of checking DOM, verify tailwind config exists
    const fs = require('fs');
    const path = require('path');
    const tailwindConfigExists = fs.existsSync(path.join(process.cwd(), 'tailwind.config.js'));
    expect(tailwindConfigExists).toBe(true);
  });
});
