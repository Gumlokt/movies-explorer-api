const { allowedCors } = require('../config');

module.exports.corsOptions = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.set('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
  res.send('ok');
};

module.exports.cors = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Origin, Authorization',
    );
    res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
  }
  next();
};
