var express = require('express');

const controllerName = 'galleries';
const MainModel = require(__path_models + controllerName);

module.exports = {
    getAllGalleries: async(req, res, next) => {
        try {
            let params = [];
            params.keyword = req.query.keyword;
            params.sortField = req.query.orderBy;
            params.sortType = req.query.orderDir;

            const data = await MainModel.listGalleries(params, { 'task': 'all' });

            res.status(200).json({
                success: true,
                data: data
            })
        } catch (error) {
            res.status(400).json({ success: false })
        }
    },
    getGallery: async(req, res, next) => {
        try {
            const data = await MainModel.listGalleries({ 'id': req.params.id }, { 'task': 'one' });

            res.status(200).json({
                success: true,
                data: data
            })
        } catch (error) {
            res.status(400).json({ success: false })
        }
    },
    addGallery: async(req, res, next) => {
        try {
            let param = {};

            // param.id = makeId(8);
            param.name = req.body.name;
            param.description = req.body.description;
            if(req.files) {
                param.img = [];
                req.files.forEach((item) => {
                    param.img.push(item.filename);
                })
            }

            const data = await MainModel.create(param);

            res.status(201).json({
                success: true,
                data: data
            })
        } catch (error) {
            res.status(400).json({ success: false })
        }
    },
    editGallery: async(req, res, next) => {
        try {
            let body = req.body;
            let idx = body.index ? JSON.parse(body.index) : [];
            body.img = body?.img ? (typeof body.img === "string" ? JSON.parse('["' + body.img + '"]') : body.img) : [];

            if(req.files) {
                req.files.forEach((item) => {
                    if(idx && idx.length > 0) {
                        body.img.splice(idx[0], 0, item.filename);
                        idx.splice(0, 1);
                    } else {
                        body.img.push(item.filename);
                    }
                })
            }

            delete body.index;
            const data = await MainModel.editGallery({ 'id': req.params.id, 'body': body }, { 'task': 'edit' });

            res.status(200).json({
                success: true,
                data: data
            })
        } catch (error) {
            res.status(400).json({ success: false })
        }
    },
    deleteGallery: async(req, res, next) => {
        try {
            const data = await MainModel.deleteGalleries({ 'id': req.params.id }, { 'task': 'one' });

            res.status(200).json({
                success: true,
                data: data
            })
        } catch (error) {
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