const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', (req,res)=>{

    //mongoDB에서 Favorite 숫자 가져오기
    Favorite.find({"movieId":req.body.movieId})
    .exec((err,info)=>{
        if(err) return res.status(400).send(err)
        return res.status(200).json({success:true,favoriteNumber:info.length})
        //프론트로 숫자 정보 보내주기
    })

})

router.post('/favorited', (req,res)=>{

    //내가 이 영화를 favorite 리스트에 넣었는지 확인
    Favorite.find({"movieId":req.body.movieId,"userFrom":req.body.userFrom})
    .exec((err,info)=>{
        if(err) return res.status(400).send(err)
        let result = false;
        if(info.length !== 0){
            result = true
        }
        return res.status(200).json({success:true,favorited:result})
        //프론트로 정보 보내주기
    })

})


router.post('/removeFromFavorite', (req,res)=>{
    Favorite.findOneAndDelete({movieId:req.body.movieId,userFrom:req.body.userFrom})
    .exec((err,doc)=>{
        if(err) return res.status(400).send(err)
        return res.status(200).json({success:true, doc})
    })

})


router.post('/addFromFavorite', (req,res)=>{
    const favorite = new Favorite(req.body) //인스턴스 생성
    favorite.save((err,doc)=>{
        if(err) return res.status(400).send(err)
        return res.status(200).json({success:true})
    })

})

module.exports = router;
