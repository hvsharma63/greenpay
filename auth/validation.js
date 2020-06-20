const { check, validationResult } = require('express-validator')

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

const createStoreValidationRules = () => {
    return [
        check('store_username', 'Store Username is required').notEmpty(),
        check('store_username', 'Store Username must be numeric').isNumeric(),
        check('store_password', 'Store Password is required').notEmpty(),
        check('store_password', 'Store Password should be greater than 4 and less than 11').isLength({ min: 5, max: 10 }),
        check('store_name', 'Store Name is required').notEmpty(),
        check('store_description', 'Store Description is required').notEmpty(),
    ]
}

module.exports = {
    createStoreValidationRules,
    validate,
}