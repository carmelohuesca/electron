const Model = require('./users.model');
const BaseController = require('../base.controller');
const Users = Model.Users;

class UsersController extends BaseController {

    static create(req, res, next) {
        new Users(req.body).save().then(result => res.status(super.HTTP_STATES.CREATED).send(result));
    }

    static read(req, res, next) {
        Users.findOne({ _id: req.params.id }, (error, item) => {
            item ? res.status(super.HTTP_STATES.SUCCESS).send(item) : res.status(super.HTTP_STATES.NOT_FOUND).send('item not found');
        });
    }

    static update(req, res, next) {
        Users.findOne({ _id: req.params.id }, (error, item) => {
            item ? Users.update(req.query, req.body, {},
                () => res.status(super.HTTP_STATES.UPDATED).json(item)) : res.status(super.HTTP_STATES.NOT_FOUND).send('item not found');
        });
    }

    static delete(req, res, next) {
        Users.findOne({ _id: req.params.id }, (error, item) => {
            item ? item.remove(
                () => res.status(super.HTTP_STATES.DELETED).send('item deleted')) : res.status(super.HTTP_STATES.NOT_FOUND).send('item not found');
        });
    }

    static list(req, res, next) {
        Users.find((err, items) => res.status(super.HTTP_STATES.SUCCESS).json(items));
    }

    static count(req, res, next) {
        res.json({ count: Users.length });
    }

    static me(req, res, next) {
        res.send(req.headers);
    }

}
module.exports = UsersController;