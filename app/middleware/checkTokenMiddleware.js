const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false
    }

    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

/* Vérification du token */
const checkTokenMiddleware = (req, res, next) => {
    // Récupération du token
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization);

    // Présence d'un token
    if (!token) {
        return res.status(401).end();

    // Véracité du token
    jwt.verify(token, process.en.TOKEN_SECRET, (err, decodedToken) => {
        if (err) {
            res.status(403).end ();
        } 
        else 
        {
            return next();
        }
    })
}
};

module.export = checkTokenMiddleware;