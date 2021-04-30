
module.exports.setFlash = function(req,res,next){
    res.locals.flash = {
        //doubt: y not req.flash.success
        'success': req.flash('success'),
        'error': req.flash('error')
    }
    next();
    //doubt:what will it go to?
}
