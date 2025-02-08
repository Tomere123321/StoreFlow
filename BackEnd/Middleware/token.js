const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json("Access denied");
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(401).json("Invalid token");
    }
};

module.exports = generateToken;