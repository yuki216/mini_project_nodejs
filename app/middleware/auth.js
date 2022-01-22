var Auth = {
    check_login: function (req, res, next)
    {
        //console.log(req.cookies)
        if (!req.cookies.uid) {
            return res.status(401).json({
                "status" : "error",
                "message" : "unauthorized",
            });
        }

        //check authorithy db must be exist

        next();
    },
};

module.exports = Auth;