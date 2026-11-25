export default function (config) {
  config.addPassthroughCopy({ 'src/assets': 'assets' });
  return { dir: { input: 'src', output: 'dist' }, templateFormats: ['11ty.js'] };
}
