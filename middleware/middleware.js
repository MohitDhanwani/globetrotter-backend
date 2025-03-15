const jwt = require("jsonwebtoken");

function checkAuth(req, res, next){

    const token = req.cookies.LoginCookie;
    
    if (!token) {
        return res.status(403).json({ msg: "Please login before continuing further" });
    }

    try {
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verifyToken;
            return next();
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token, please log in" });
    }
}

module.exports =  checkAuth ;
