const fs = require('fs');

module.exports = app => fs.readdir('./api', (err, files) => files.forEach(item => { 
    if (item !== 'index.js') require('./' + item)(app);
}));