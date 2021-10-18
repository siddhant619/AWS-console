const express = require('express')
const router = express.Router()

const {describeVPCandInstances}= require('../controllers/describeVPCandInstances')


router.route("/").get(describeVPCandInstances)

module.exports= router