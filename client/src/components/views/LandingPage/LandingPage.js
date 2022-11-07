import React,{useEffect,useState} from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import MainImage from './Section/MainImage';

function LandingPage() {
    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    

    useEffect(() => {
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

      fetch(endpoint) //데이터 가져오기
      .then(response => response.json())
      .then(response => {

        setMovies([response.results])
        setMainMovieImage(response.results[0])
      })
    }, [])
    


    return (
        <div style={{width:'100%', margin:'0'}}>
            {/* MainMovieImage가 있을때 렌더링하라 */}
            {/* img 경로 맞춰주기 */}
            {MainMovieImage &&
                <MainImage image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                /> 
            }
            
            <div style={{width:'85%',margin:'1rem auto'}}>
                <h2>Movies by latest</h2>
                <br/>

                {/* Movie Grid Cards */}
            </div>

            <div style={{display:'flex',justifyContent:'center'}}>
                <button>Load More</button>
            </div>
        </div>
    )
}

export default LandingPage
