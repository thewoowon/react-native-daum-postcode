import App from './App';

const { name, version, homepage } = require('../package.json');
console.log(`📦 ${name} v${version} - ${homepage}`);

export const Postcode = App;

export default Postcode;
