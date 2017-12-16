import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const token = req.query.token || req.body.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).send(err);
      }
      req.verified = user;
      return next();
    });
  } else {
    res.status(403).send('Token not provided');
  }
};

export default authenticateToken;
