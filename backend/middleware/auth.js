const ensureAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    } else {
        res.redirect('/')
    }
}

const ensureGuest = (req, res, next) => {
    if(req.isAuthenticated()){
        res.redirect('/dashboard')
    } else {
        return next()
    }
}

function ensureSecure(req, res, next){
    if(req.headers["x-forwarded-proto"] === "https"){
        // OK, continue
        return next();
    };
    // Redirect to HTTPS
    res.redirect('https://' + req.hostname + req.url);
};

module.exports = {ensureAuth, ensureGuest, ensureSecure}