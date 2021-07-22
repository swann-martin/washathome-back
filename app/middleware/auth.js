const jwt = require('jsonwebtoken');

/*const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false
    }

    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

/* Vérification du token */
/*const checkTokenMiddleware = (req, res, next) => {
   console.log('arrive');
    // Récupération du token
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization);

    // Présence d'un token
    if (!token) {
        return res.status(401).end();
    }

    //Véracité du token
    jwt.verify(token, process.en.TOKEN_SECRET, (err, decodedToken) => {
        if (err) {
            res.status(403).end ();
        } 
        else 
        {
            return next();
        }
    })
};




module.export = checkTokenMiddleware;*/
//const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
