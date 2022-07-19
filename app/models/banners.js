const MainModel = require(__path_schemas + 'banners');

module.exports = {
    create: (item) => {
        return new MainModel(item).save();
    }
}