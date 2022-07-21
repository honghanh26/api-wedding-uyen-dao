const MainModel = require(__path_schemas + 'banners');

module.exports = {
    listBanners: (params, option) => {
        let sort = {};
        let objWhere = {};
        if (params.keyword !== '') objWhere.name = new RegExp(params.keyword, 'i');
        if (params.sortField) sort[params.sortField] = params.sortType;

        if (option.task == 'all') {
            return MainModel
                .find(objWhere)
                .select('id name description img')
                .sort(sort)
        }
        if (option.task == 'one') {
            return MainModel
                .find({ id: params.id })
                .select('id name description img')
        }
    },
    create: (item) => {
        return new MainModel(item).save();
    }
}