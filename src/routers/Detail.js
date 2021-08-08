import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

/* query 에 varriable 이 하나도 없을때. 특벽하게 뭘 적을 필요 x */
/* 하지만 있을때 ex_) id 같은거 그럴떄는 apollo React GraphQL ReactApoll 를위해서 적어줘야함 */
/* query getMovie($id : Int) 이부분을 이건 apollo 를위한거 */
const get_movie_detail = gql`
    query getMovie($id: Int!) {
        movie(id: $id) {
            id
            title
            medium_cover_image
            rating
            language
            description_intro
            isLiked @client
        }
        suggestions(id: $id) {
            id
            medium_cover_image
        }
    }
`;

const Container = styled.div`
    padding-left: 18px;
    width: 100%;
    height: 100vh;
    color: #fff;
    display: flex;
    background: linear-gradient(to left, #7f7fd5, #86a8e7, #f64f59);
    justify-content: center;
    align-items: center;
    gap: 38px;
`;

const Column = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h1`
    font-size: 45px;
    margin-bottom: 10px;
`;

const Subtitle = styled.h2`
    font-size: 22px;
    margin-bottom: 30px;
`;

const Description = styled.span`
    font-size: 18px;
`;

const Poster = styled.div`
    width: 230px;
    height: 345px;
    background-image: url(${(props) => props.bg});
    background-size: cover;
    background-position: center center;
`;

const SuPoster = styled.div``;
const Suggestions = styled.div`
    display: flex;
    margin-top: 15px;
    gap : 15px;
`;

const DetailContainer = styled.div``;

const Main = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
`;

const Detailpage = () => {
    const { id } = useParams();
    const { loading, data } = useQuery(get_movie_detail, {
        variables: { id: parseInt(id) },
    });
    console.log(data);
    return (
        <Container>
            {loading
                ? 'loading...'
                : data &&
                  data.movie &&
                  data.suggestions && (
                      <DetailContainer>
                          <Main>
                              <Column>
                                  <Title>
                                      {data.movie.title}{' '}
                                      {data.movie.isLiked ? '[Like!]' : ''}{' '}
                                  </Title>
                                  <Subtitle>
                                      rating : {data.movie.rating} / language :{' '}
                                      {data.movie.language}
                                  </Subtitle>
                                  <Description>
                                      {data.movie.description_intro}
                                  </Description>
                              </Column>
                              <Poster bg={data.movie.medium_cover_image} />
                          </Main>
                          <Suggestions>
                              {data.suggestions.map((suData) => (
                                  <Link to={`/${suData.id}`}>
                                      <Poster
                                          bg={suData.medium_cover_image}
                                      ></Poster>
                                  </Link>
                              ))}
                          </Suggestions>
                      </DetailContainer>
                  )}
        </Container>
    );
};

export default Detailpage;
