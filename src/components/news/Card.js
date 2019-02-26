import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {
  Card,
  CardImg,
  CardHeader,
  CardBody,
  CardTitle,
  CardText } from 'reactstrap';
import { showSource, showArticle } from '../../store'
import '../../stylesheets/newsfeed.css'


const CaroCard = ({source: {_id, img}, showSource}) => {

  return(
    <div onClick={() => showSource(_id)}>
      <Link to= {{ pathname: `/source/${_id}`}}>
        <img src={img} alt=""  />
      </Link>
    </div>
  )
}

export const NewsCard = ({article:{ _id, author, title, category, urlToImage, description, url, source}, showArticle}) => {
  let hostname
  if(!source){
    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];
  }
  return(
    <Card>
      {source ?
      <CardHeader tag="h3">{source.name}</CardHeader>
      :
      <CardHeader tag="h3">{hostname}</CardHeader>
      }
      <Link to={{pathname: `/article/${_id}`}}>
        <CardImg top width="100%" src={urlToImage} alt="Card image cap" onClick={() => showArticle(_id)}/>
      </Link>
      <CardBody>
        <CardTitle className="desc">{title}</CardTitle>
        <CardTitle>BY: {author || "Suzie McGee"}</CardTitle>
        <CardText>{description}</CardText>
      </CardBody>
    </Card>
  )
}

const mapDispatchToCarousel = (dispatch) => {
  return {
    showSource: (id) => {
      return dispatch(showSource(id))
    }
  }
}
const mapDispatchToFeed = (dispatch) => {
  return {
    showArticle: (id) => {
      return dispatch(showArticle(id))
    }
  }
}


export const CarouselCard = connect (null, mapDispatchToCarousel)(CaroCard)
export const NewsFeedCard = connect(null, mapDispatchToFeed)(NewsCard)
