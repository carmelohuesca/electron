const Model = require('./base.model');

class BaseController {

    static get Model() {
        return Model;
    }

    static get HTTP_STATES() {
        return {
            SUCCESS: 200,
            CREATED: 201,
            UPDATED: 202,
            DELETED: 204,
            UNAUTHORIZED: 401,
            NOT_FOUND: 404,
            SERVER_ERROR: 500
        };
    }

    static create(req, res, next) {
        new Model(req.body).save().then(result => res.status(super.HTTP_STATES.CREATED).send(result));
    }

    static read(req, res, next) {
        Model.findOne({ _id: req.params.id }, (error, item) => {
            item ? res.status(super.HTTP_STATES.SUCCESS).send(item) : res.status(super.HTTP_STATES.NOT_FOUND).send('item not found');
        });
    }

    static update(req, res, next) {
        Model.findOne({ _id: req.params.id }, (error, item) => {
            item ? Model.update(req.query, req.body, {}, () => res.status(super.HTTP_STATES.UPDATED).json(item)) : res.status(super.HTTP_STATES.NOT_FOUND).send('item not found');
        });
    }

    static delete(req, res, next) {
        Model.findOne({ _id: req.params.id }, (error, item) => {
            item ? item.remove(() => res.status(super.HTTP_STATES.DELETED).send('item deleted')) : res.status(super.HTTP_STATES.NOT_FOUND).send('item not found');
        });
    }

    static list(req, res, next) {
        Model.find((err, items) => res.status(super.HTTP_STATES.SUCCESS).json(items));
    }

    static count(req, res, next) {
        res.json({ count: Model.length });
    }

    static excepetion(err, next) {
        if (err) { return next(err); }
    }

}
module.exports = BaseController;