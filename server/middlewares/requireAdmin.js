module.exports = (req, res, next) => {
    if(req.user.accountType !=="admin"){
        return res.status(401).send({error: 'You must be Admin!'});
    }

    next();
};