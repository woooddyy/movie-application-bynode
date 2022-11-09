const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");
const { auth } = require("../middleware/auth");

//=================================
//             Subscribe
//=================================

router.post("/saveComment", auth, (req, res) => {

    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        //console.log(err)
        if (err) return res.json({ success: false, err })
        //저장된 걸 다시 찾은 후에 populate해야함(모든 writer에 대한 정보가져올 수 있다.)
        Comment.find({ '_id': comment._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })
})

router.post("/getComments", (req, res) => {

    Comment.find({ "postId": req.body.movieId })
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })
});

module.exports = router;