function validarId(req, res, next){
    const {id} = req.params

    if(!id || isNaN(id)){
        return res.status(400).json({error: 'Id inválido'})
    }

    if(parseInt(id) <= 0){
        return res.status(400).json({error: 'Id inválido'})
    }

    if(!Number.isInteger(parseFloat(id))){
        return res.status(400).json({error: 'Id inválido'})
    }


    next()
}

module.exports = {
    validarId
}