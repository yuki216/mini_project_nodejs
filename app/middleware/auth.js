const jwt = require('jsonwebtoken');


var Auth = {
    check_login: function (req, res, next)
    {
            

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        if (token == null) 
        return res.status(401).json({
            "status" : "error",
            "message" : "unauthorized",
        });

        jwt.verify(token, "Yuki-Token-123", (err, decoded) => {
            if (err)
            return res.status(401).json({
                "status" : "error",
                "message" : "unauthorized",
            });

            req.merchantName = decoded.merchantName;
            req.merchantID = decoded.merchantID;
        })

        //check authorithy rbac

        next();
    },
};

module.exports = Auth;