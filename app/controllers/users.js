var express = require('express');
var fs = require('fs');
var path = require('path');

const controllerName = 'users';
const MainModel = require(__path_models + controllerName);

module.exports = {
    getAllUsers: async(req, res, next) => {
        try {
            let params = [];
            params.keyword = req.query.keyword;
            params.sortField = req.query.orderBy;
            params.sortType = req.query.orderDir;

            const data = await MainModel.listUsers(params, { 'task': 'all' });

            res.status(200).json({
                success: true,
                data: data
            })
        } catch (error) {
            res.status(400).json({ success: false })
        }
    },
    getUser: async(req, res, next) => {
        try {
            const data = await MainModel.listUsers({ 'id': req.params.id }, { 'task': 'one' });

            res.status(200).json({
                success: true,
                data: data
            })
        } catch (error) {
            res.status(400).json({ success: false })
        }
    },
    addUser: async(req, res, next) => {
        try {
            let param = {};

            param.id = makeId(8);
            param.name = req.body.name;
            param.description = req.body.description;
            param.role = req.body.role;
            if(req.file) {
                param.img = {
                    data: fs.readFileSync(path.join(__path_uploads + req.file.filename)),
                    contentType: req.file.mimetype
                };
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
    editUser: async(req, res, next) => {
        try {
            let body = req.body;
            if(req.file) {
                body.img = {
                    data: fs.readFileSync(path.join(__path_uploads + req.file.filename)),
                    contentType: req.file.mimetype
                };
            }
            const data = await MainModel.editUser({ 'id': req.params.id, 'body': body }, { 'task': 'edit' });

            res.status(200).json({
                success: true,
                data: data
            })
        } catch (error) {
            res.status(400).json({ success: false })
        }
    },
    deleteUser: async(req, res, next) => {
        try {
            const data = await MainModel.deleteUsers({ 'id': req.params.id }, { 'task': 'one' });

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