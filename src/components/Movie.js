import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
{
    /* <h1>{movie.title}</h1>
<img src={movie.medium_cover_image} alt="" /> */
}

const Container = styled.div`
    height: 380px;
    width: 100%;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16) , 0 3px 6px rgba(0,0,0,0.23);
    border-radius: 20px;
    overflow: hidden;
`;

const Poster = styled.div`
    background-image: url(${props => props.bg});
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
`;

export default ({ id , bg}) => (
    <Container>
        <Link to={`/${id}`}>
            <Poster bg = {bg}></Poster>
        </Link>
    </Container>
);
