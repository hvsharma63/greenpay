const { check, validationResult } = require('express-validator')
const pool = require("./../config/database");

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

const createCustomerValidation = () => {
    return [
        check('customer_name', 'Customer Name is required').notEmpty(),
        check('customer_type', 'Customer Type is required').notEmpty(),
        check('customer_type', 'Customer Type should either be monthly or daily').isIn(['monthly', 'daily']),
        check('customer_topup', 'Customer Topup is required').notEmpty(),
        check('customer_topup', 'Customer Topup must be numeric').isNumeric(),
        check('customer_phone', 'Customer Phone is required').notEmpty(),
        check('customer_phone', 'Customer Phone should be greater than 9 and less than 13').isLength({ min: 10, max: 12 }),
        check('company_name', 'Company Name is required').notEmpty(),
        check('customer_barcode', 'Customer Barcode is required').notEmpty(),
        check('customer_remarks', 'Customer Remarks is required').notEmpty(),
        check('customer_breakfast', 'Customer Breakfast is required').notEmpty(),
        check('customer_lunch', 'Customer Lunch is required').notEmpty(),
        check('customer_dinner', 'Customer Dinner is required').notEmpty(),
        check('customer_start_date', 'Customer Start Date is required').notEmpty(),
        check('customer_start_date', 'Customer Start Date must be in date format YYYY-MM-DD').isISO8601(),
    ]
}


const createStoreItemValidation = () => {
    return [
        check('store_id').custom((value, { req }) => {
            return checkExists(value, 'store_user');
        }),
        check('item_name', 'Item Name is required').notEmpty(),
        check('item_description', 'Item Description is required').notEmpty(),
        check('item_price', 'Item Price is required').notEmpty(),
        check('item_price', 'Item Price must be numeric').isNumeric(),
    ]
}

const existValidationRule = (entity) => {

    switch (entity) {
        case 'store_user':
        case 'customer':
        case 'store_item':
            return [
                check('id').custom((value, { req }) => {
                    return checkExists(value, entity);
                }),
            ]
        default:
            break;
    }

}

const checkExists = (value, entity) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT COUNT(*) as exist FROM green_pay.${entity} WHERE id = ?`,
            [value],
            (error, results, fields) => {
                if (error) {
                    reject(new Error('Something went wrong'))
                } else {
                    if (results[0].exist) {
                        resolve(true)
                    } else {
                        reject(new Error(`${entity} does not exist`))
                    }
                }
            }
        );
    });
}

module.exports = {
    createStoreValidationRules,
    createCustomerValidation,
    createStoreItemValidation,
    existValidationRule,
    validate,
}