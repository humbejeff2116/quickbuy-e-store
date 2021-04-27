

















module.exports = function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();

    }
    req.flash('info' , 'you must be logged in to be able to view this page')
    return res.redirect('/admin/login');
}