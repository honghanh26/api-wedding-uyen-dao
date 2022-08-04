const MainModel = require(__path_schemas + 'galleries');

module.exports = {
    listGalleries: (params, option) => {
        let sort = {};
        let objWhere = {};
        if (params.keyword !== '') objWhere.name = new RegExp(params.keyword, 'i');
        if (params.sortField) sort[params.sortField] = params.sortType;

        if (option.task == 'all') {
            return MainModel
                .find(objWhere)
                .select('_id name description img')
                .sort(sort)
        }
        if (option.task == 'one') {
            return MainModel
                .find({ _id: params.id })
                .select('_id name description img')
        }
    },
    create: (item) => {
        return new MainModel(item).save();
    },
    editGallery: (params, option) => {
        if (option.task == 'edit') {
            return MainModel
                .updateOne({ _id: params.id }, params.body);
        }
    }
}