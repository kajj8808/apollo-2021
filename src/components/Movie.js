import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/client';

/* 여기서 중요한건 mutation 이 @client 에 있다고 알려야함. */
const LIKE_MOVIE = gql`
    mutation toggleLikeMovie($id: Int! , $isLiked: Boolean!) {
        toggleLikeMovie(id: $id , isLiked : $isLiked) @client
    }
`;

const Container = styled.div`
    height: 380px;
    width: 100%;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    border-radius: 20px;
    overflow: hidden;
`;

const Poster = styled.div`
    background-image: url(${(props) => props.bg});
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
`;

const LikeBtn = styled.button`
    position: absolute;
    z-index: 3;
`

const Contant = ({ id, bg, isLiked }) => {
    /* [] 안에 들어갈 일므은 아무거나 지을수있는거. */
    const [toggleMovie] = useMutation(LIKE_MOVIE, {
        variables: { id: parseInt(id) , isLiked },
    });
    return (
        <Container>
            <Link to={`/${id}`}>
                <Poster bg={bg}></Poster>
            </Link>
            <LikeBtn onClick={toggleMovie}>
                {isLiked ? 'Unlikned' : 'Like'}
            </LikeBtn>
        </Container>
    );
};

export default Contant;
