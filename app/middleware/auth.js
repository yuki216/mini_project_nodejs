var Auth = {
    check_login: function (req, res, next)
    {
        console.log(req.cookies)
        if (!req.cookies.uid) {
            console.log("OK")
        }

        next();
    },
};

module.exports = Auth;