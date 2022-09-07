var express = require('express');

const controllerName = 'banners';
const MainModel = require(__path_models + controllerName);

module.exports = {
    getAllBanners: async(req, res, next) => {
        try {
            let params = [];
            params.keyword = req.query.keyword;
            params.sortField = req.query.orderBy;
            params.sortType = req.query.orderDir;

            const data = await MainModel.listBanners(params, { 'task': 'all' });

            res.status(200).json({
                success: true,
                data: data
            })
        } catch (error) {
            res.status(400).json({ success: false })
        }
    },
    getBanner: async(req, res, next) => {
        try {
            const data = await MainModel.listBanners({ 'id': req.params.id }, { 'task': 'one' });

            res.status(200).json({
                success: true,
                data: data
            })
        } catch (error) {
            res.status(400).json({ success: false })
        }
    },
    addBanner: async(req, res, next) => {
        try {
            let param = {};

            param.id = makeId(8);
            param.name = req.body.name;
            param.description = req.body.description;
            if(req.file) {
                param.img = req.file.filename;
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
    editBanner: async(req, res, next) => {
        try {
            let body = req.body;
            if(req.file) {
                body.img = req.file.filename;
            }
            const data = await MainModel.editBanner({ 'id': req.params.id, 'body': body }, { 'task': 'edit' });

            res.status(200).json({
                success: true,
                data: data
            })
        } catch (error) {
            res.status(400).json({ success: false })
        }
    },
    deleteBanner: async(req, res, next) => {
        try {
            const data = await MainModel.deleteBanners({ 'id': req.params.id }, { 'task': 'one' });

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