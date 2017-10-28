class UsersController {

    static get mock() {
        const detail = { id: 1, name: 'carmelo' };
        return {
            list: [detail, { id: 2, name: 'daniel' }, { id: 3, name: 'raquel' }],
            read: detail
        };
    }

    static list(req, res, next) {
        res.send(UsersController.mock.list);
    }

    static read(req, res, next) {
        res.send(UsersController.mock.read);
    }


}
module.exports = UsersController;