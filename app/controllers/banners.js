var express = require('express');
var fs = require('fs');
var path = require('path');

const controllerName = 'banners';
const MainModel = require(__path_models + controllerName);

module.exports = {
    addBanner: async(req, res, next) => {
        try {
            let param = {};

            param.id = makeId(8);
            param.name = req.body.name;
            param.description = req.body.description;
            param.img = {
                data: fs.readFileSync(path.join(__path_uploads + req.file.filename)),
                contentType: req.file.mimetype
            };

            const data = await MainModel.create(param);

            res.status(201).json({
                success: true,
                data: data
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({ success: false })
        }
    }
}

makeId = (number) => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < number; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}