import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

/* query 에 varriable 이 하나도 없을때. 특벽하게 뭘 적을 필요 x */
/* 하지만 있을때 ex_) id 같은거 그럴떄는 apollo React GraphQL ReactApoll 를위해서 적어줘야함 */
/* query getMovie($id : Int) 이부분을 이건 apollo 를위한거 */
const get_movie_detail = gql`
    query getMovie($id: Int!) {
        movie(id: $id) {
            title
            medium_cover_image
            rating
            language
            description_intro
        }
    }
`;

const Container = styled.div`
    padding-left: 18px;
    width: 100%;
    height: 100vh;
    background-color: red;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap : 38px;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.h1`
    font-size: 45px;
    margin-bottom: 10px;
`;

const Subtitle = styled.h2`
    font-size: 25px;
    margin-bottom: 10px;
`;

const Description = styled.span`
    font-size: 18px;
`;

const Poster = styled.div`
    width: 50%;
    height: 60%;
    background-image: url(${(props) => props.bg});
    background-size: cover;
    background-position: center;
`;

const Detailpage = () => {
    const { id } = useParams();
    const { loading, data } = useQuery(get_movie_detail, {
        variables: { id: +id },
    });
    return loading
        ? 'loading'
        : data && (
              <Container>
                  <Column>
                      <Title>{data.movie.title} </Title>
                      <Subtitle>
                          {data.movie.language} • {data.movie.rating}
                      </Subtitle>
                      <Description>{data.movie.description_intro}</Description>
                  </Column>
                  <Poster bg={data.movie.medium_cover_image} />
              </Container>
          );
};

export default Detailpage;
