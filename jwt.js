const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];

        // Verificar el token
        jwt.verify(bearerToken, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).send({ message: "Token is not valid" });
            }
            req.user = decoded; // Guarda la información decodificada del token en req.user
            next();
        });
    } else {
        res.status(401).send({ message: "Authorization token is required" });
    }
};

module.exports = verifyToken;
