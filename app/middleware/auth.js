var Auth = {
    check_login: function (req, res, next)
    {
        //console.log(req.cookies)
        if (!req.cookies.uid) {
            return res.status(401).json({
                "code" : "error",
                "message" : "unauthorized",
            });
        }

        next();
    },
};

module.exports = Auth;