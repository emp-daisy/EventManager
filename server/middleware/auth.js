import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const token = req.query.token || req.body.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).send(err);
      }
      req.verified = user;
      next();
    });
  } else {
    return res.status(403).send('Token not provided');
  }
};

const isAdmin = (req, res, next) => {
  if (!req.verified.isAdmin) {
    return res.status(403).json({
      msg: 'Not logged in as an Admin'
    });
  }
  next();
};

export {
  // authenticateToken,
  isAdmin
};
export default authenticateToken;
