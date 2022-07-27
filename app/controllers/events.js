var express = require('express');
var nodemailer =  require('nodemailer');

const controllerName = 'events';
const MainModel = require(__path_models + controllerName);

module.exports = {
    getAllEvents: async(req, res, next) => {
        try {
            let params = [];
            params.keyword = req.query.keyword;
            params.sortField = req.query.orderBy;
            params.sortType = req.query.orderDir;

            const data = await MainModel.listEvents(params, { 'task': 'all' });

            res.status(200).json({
                success: true,
                data: data
            })
        } catch (error) {
            res.status(400).json({ success: false })
        }
    },
    getEvent: async(req, res, next) => {
        try {
            const data = await MainModel.listEvents({ 'id': req.params.id }, { 'task': 'one' });

            res.status(200).json({
                success: true,
                data: data
            })
        } catch (error) {
            res.status(400).json({ success: false })
        }
    },
    addEvent: async(req, res, next) => {
        try {
            let param = {};

            param.id = makeId(8);
            param.name = req.body.name;
            param.description = req.body.description;
            param.location = req.body.location;
            param.date = req.body.date;
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
    editEvent: async(req, res, next) => {
        try {
            let body = req.body;
            if(req.file) {
                body.img = req.file.filename;
            }
            const data = await MainModel.editEvent({ 'id': req.params.id, 'body': body }, { 'task': 'edit' });

            res.status(200).json({
                success: true,
                data: data
            })
        } catch (error) {
            res.status(400).json({ success: false })
        }
    },
    sendMail: (req, res, next) => {
        var transporter = nodemailer.createTransport({ // config mail server
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'uyendaowedding@gmail.com',
                pass: 'lazhwpsjztrzymjs' //uyendaowedding2509
            }
        });
        var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: req.body.email,
            to: 'uyendaowedding@gmail.com',
            subject: 'Tham Dự Tiệc',
            html: '<p>You have got a new message</b>\
                    <ul><li>Tên:' + req.body.name + '</li>\
                    <li>Email:' + req.body.email + '</li>\
                    <li>Số khách:' + req.body.guest + '</li>\
                    <li>Tham dự tiệc:' + req.body.event + '</li>\
                    <li>Ghi chú:' + req.body.message + '</li></ul>'
        }
        transporter.sendMail(mainOptions, function(err, info){
            if (err) {
                res.status(400).json({ success: false })
            } else {
                res.status(200).json({
                    success: true,
                    data: info
                })
            }
        });
    }
}

makeId = (number) => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < number; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}