const MainModel = require(__path_schemas + 'users');

module.exports = {
    listUsers: (params, option) => {
        let sort = {};
        let objWhere = {};
        if (params.keyword !== '') objWhere.name = new RegExp(params.keyword, 'i');
        if (params.sortField) sort[params.sortField] = params.sortType;

        if (option.task == 'all') {
            return MainModel
                .find(objWhere)
                .select('id name description role')
                .sort(sort)
        }
        if (option.task == 'one') {
            return MainModel
                .find({ id: params.id })
                .select('id name description role')
        }
    },
    create: (item) => {
        return new MainModel(item).save();
    },
    deleteUsers: (params, option) => {
        if (option.task == 'one') {
            return MainModel
                .deleteOne({ id: params.id })
        }
    },
    editUser: (params, option) => {
        if (option.task == 'edit') {
            return MainModel
                .updateOne({ id: params.id }, params.body);
        }
    }
}