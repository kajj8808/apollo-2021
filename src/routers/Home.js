import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import Movie from '../components/Movie';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    color: #dfe6e9;
    font-weight: 600;
    font-size: 30px;
`;

const Subtitle = styled.h2`
    color: #dfe6e9;
    font-weight: 400;
    font-size: 13px;
`;

const Header = styled.header`
    width: 100%;
    height: 200px;
    background: linear-gradient(to left, blue, pink);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
`;

const getMovies = gql`
    {
        movies(rating: 8.5, limit: 20) {
            id
            title
            medium_cover_image
            isLiked @client
        }
    }
`;
/* isLiked 는 backend 가아니라 frontend 에서 가져온다는말 @clint */


const MovieContainer = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 60%;
    gap: 25px;
    top: -30px;
`;

const Loading = styled.h3`
    position : relative;
    top : 15px;
    color : #bdc3c7;
`;

const HomePage = () => {
    const { loading, error, data } = useQuery(getMovies);
    return (
        <Container>
            <Header>
                <Title>Apollo 2021</Title>
                <Subtitle>GraphQL</Subtitle>
            </Header>
            {loading ? (
                <Loading>loading...</Loading>
            ) : (
                data.movies && (
                    <MovieContainer>
                        {data.movies.map((movie) => (
                            <Movie
                                key={movie.id}
                                id={movie.id}
                                isLiked = {movie.isLiked}
                                bg={movie.medium_cover_image}
                            />
                        ))}
                    </MovieContainer>
                )
            )}
        </Container>
    );
};

export default HomePage;
