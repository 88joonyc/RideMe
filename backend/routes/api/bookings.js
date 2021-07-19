const express = require('express')

const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking } = require('../../db/models');

const router = express.Router();

router.get('/', requireAuth, asyncHandler (async (req, res) => {
    const booking = await Booking.findAll()
    return res.json(booking)
}))

// router.post('/', requireAuth, asyncHandler (async (req, res) => {

// }))

module.exports = router;