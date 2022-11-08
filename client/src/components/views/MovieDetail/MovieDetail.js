import React, {useEffect,useState} from 'react';
import {API_KEY,API_URL,IMAGE_BASE_URL} from '../../Config';
import MainImage from '../LandingPage/Section/MainImage';
import MovieInfo from './Sections/MovieInfo';
import { Row } from 'antd';
import GridCards from '../commons/GridCards';
import Favorite from './Sections/Favorite';

function MovieDetail(props) {
    //url에서 가져오기
    let movieId=props.match.params.movieId //App.js에서 :movieId로 줘서 파라미터로 가져옴
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    useEffect(() => {
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        //console.log(movieId)
        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            //console.log(response)
            setMovie(response)
        })

        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
            //console.log(response)
            setCasts(response.cast)
        })
    }, [])
    
    const toggleActorView = ()=>{
        setActorToggle(!ActorToggle)
    }
  return (
    <div>
        {/* Header : MainImage 이용 */}
        <MainImage 
            image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
            title={Movie.original_title}
            text={Movie.overview}
        />

        {/* Body */}
        <div style={{width:'85%',margin:'1rem auto'}}>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
                {/* login할때 로컬스토리지에 넣어줬음 */}
                <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
            </div>

            {/* Movie Info */}
            <MovieInfo
                movie={Movie}
            />


            <br/>
            {/* Actors Grid */}
            <div style={{display:'flex',justifyContent:'center',margin:'2rem'}}>
                <button onClick={toggleActorView}>Toggle Actor View</button>
            </div>
            {ActorToggle &&
                <Row gutter={[16,16]}>
                    {Casts && Casts.map((cast, index)=>(
                        <React.Fragment key={index}>
                                <GridCards 
                                image={cast.profile_path ? 
                                    `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                characterName={cast.name}
                                />
                        </React.Fragment>
                    ))}
                

                </Row>
            }

        </div>
    </div>
  )
}

export default MovieDetail