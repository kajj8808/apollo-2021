import ApolloClient from 'apollo-boost';

/* isLiked 는 backend 가아니라 frontend 에서 가져온다는말 */
/* mutation 은 parmeter 를 정할수있음 작동은 backend에서 */
/* mutation 의 사용방법은 graphql resolver 이랑 똑같고. 그러니까 경로는무시하고 _ 원하는 argument 를 입력하고  
  context . 는 cache
*/
const client = new ApolloClient({
    uri: 'http://1.226.58.243:4000' /* movie api server url */,
    resolvers: {
        Movie: {
            isLiked: () => false,
        },
        Mutation: {
            toggleLikeMovie: (_, { id , isLiked}, { cache }) => {/* _ -> root */
                cache.writeData({ id: `Movie:${id}`, data: { isLiked: !isLiked } });
            },
        },
    },
});

export default client;
