const model = require('./users.model');
const Users = model.Users;
const Posts = model.Posts;
class UsersController {

    static get mock() {
        const detail = { id: 1, name: 'carmelo' };
        return {
            list: [detail, { id: 2, name: 'daniel' }, { id: 3, name: 'raquel' }],
            read: detail
        };
    }

    static list(req, res, next) {
        Users.find(function(err, items) {
            res.status(200).json(items);
        });
        // res.send(UsersController.mock.list);
    }

    static read(req, res, next) {
        const id = req.params.id;
        if (id && id >= 0 && id < UsersController.mock.list.length) {
            res.send(UsersController.mock.list[req.params.id]);
        } else {
            res.redirect('/404');
        }
    }

    static me(req, res, next) {
        res.send(UsersController.mock.read);
    }

    static count(req, res, next) {
        res.json({ count: Users.length });
    }

    static create(req, res, next) {
        const created = new Users({
            name: req.body.name,
            email: req.body.email
        }).save();
        created.then(result => res.status(201).send(result));
    }

}
module.exports = UsersController;