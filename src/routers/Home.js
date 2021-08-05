import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

const Container = styled.div``;

const Title = styled.h1`
    font-weight: 600;
    color : #dfe6e9;
    font-size: 18px;
`;

const Header = styled.header`
    width: 100%;
    height: 200px;
    background: linear-gradient(to left, blue, pink);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const getMovies = gql`
    {
        movies(rating: 8.5, limit: 20) {
            id
            title
            medium_cover_image
        }
    }
`;

export default () => {
    const { loading, error, data } = useQuery(getMovies);
    return (
        <Container>
            <Header>
                <Title>Header</Title>
            </Header>
            {loading
                ? 'loading...'
                : data.movies.map((movie) => (
                      <>
                          <h1>{movie.title}</h1>
                      </>
                  ))}
        </Container>
    );
};
