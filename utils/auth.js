const withAuth = (req, res, next) => {
    if (!req.session.userId) {
        res.direct('/login');
    } else {
        next();
    }
};