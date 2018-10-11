import React, { Component } from 'react'
import { 
    Card, CardImg, CardText, CardBody,
    CardTitle, Row, Col 
} from 'reactstrap'; 
// import { moment } from 'moment'
import { apiKey } from '../../config/config'
import axiosInstance from '../axiosInstance'
import { Redirect } from 'react-router-dom'

class UpComing extends Component {
    constructor (props) {
        super (props)
        this.state = {
            upComing : [],
            movieDetail : false,
            movieId : 0
        }
    }

    componentDidUpdate (prevProps, prevStates) {
        if(prevProps.active !== this.props.active
            && this.props.active){
            this.getUpComingMovies ()
        }
    }
    
    setMovieDetail (e) {
        this.setState ({
            movieDetail : true,
            movieId : e
        })
    }
    getUpComingMovies () {
        axiosInstance ({
            method : 'GET',
            url : `movie/upcoming?api_key=${apiKey}`
        })
        .then(res => {
            console.log(res.data)
            this.setState ({
                upComing : res.data.results,
                page : res.data.page,
                totalPages : res.data.total_pages
            })
        })
        .catch(error => {
            console.log(error)
        })
    }
    render () {
        return (
            <div className="container-fluid">
                <h1>UpComing Movies</h1>
                {this.state.upComing.length > 0 ? 
                <Row>
                    {this.state.upComing.map((e, key) => {
                        return <Col  md="4" sm="12" key = {key} >
                        <Card onClick = {() => this.setMovieDetail(e.id)}>
                            <CardImg top width="100px" src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`} alt={e.title} />
                            <CardBody>
                            <CardTitle>{e.title}</CardTitle>
                            <CardText >{e.overview}</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    })}
                </Row>
                : <p>No Records</p>}
                {this.state.movieDetail ? <Redirect push to={{pathname:`/movie/${this.state.movieId}`, state : {id : this.state.movieId}}}/> : null }
            </div>
        )
    }
}

export default UpComing;