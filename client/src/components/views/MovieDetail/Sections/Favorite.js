import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import { Button } from 'antd'

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        movieRunTime: movieRunTime,
        movieTitle: movieTitle,
        moviePost: moviePost
      }
    useEffect(() => {
      //page켜지자마자 Favorite 숫자 가져오기
      //서버에 요청해야함
      Axios.post('/api/favorite/favoriteNumber',variables)
        .then(response => {
            if(response.data.success){
                setFavoriteNumber(response.data.favoriteNumber)
            } else {
                alert('숫자 정보를 가져오는데 실패했습니다.')
            }
        })
        
      Axios.post('/api/favorite/favorited',variables)
      .then(response => {
          if(response.data.success){
                setFavorited(response.data.favorited)
          } else {
              alert('정보를 가져오는데 실패했습니다.')
          }
      })
    }, [])
    const onClickFavorite = () => {
        if(Favorited){
            Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber-1)
                    setFavorited(!Favorited)
                } else {
                    alert('Favorite 리스트에서 지우는걸 실패했습니다.')
                }
            })
        } else {
            Axios.post('/api/favorite/addFromFavorite', variables)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber+1)
                    setFavorited(!Favorited)
                } else {
                    alert('Favorite 리스트에서 추가하는걸 실패했습니다.')
                }
            })
        }
    }
  return (
    <div>
        <Button onClick={onClickFavorite}>{Favorited? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}</Button>
    </div>
  )
}

export default Favorite