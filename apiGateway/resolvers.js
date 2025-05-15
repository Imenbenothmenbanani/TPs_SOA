// resolvers.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
// Charger les fichiers proto pour les films et les séries TV
const movieProtoPath = 'movie.proto';
const tvShowProtoPath = 'tvShow.proto';
const movieProtoDefinition = protoLoader.loadSync(movieProtoPath, {
keepCase: true,
longs: String,
enums: String,
defaults: true,
oneofs: true,
});
const tvShowProtoDefinition = protoLoader.loadSync(tvShowProtoPath, {
keepCase: true,
longs: String,
enums: String,
defaults: true,
oneofs: true,
});
const movieProto = grpc.loadPackageDefinition(movieProtoDefinition).movie;
const tvShowProto = grpc.loadPackageDefinition(tvShowProtoDefinition).tvShow;
// Définir les résolveurs pour les requêtes GraphQL
const resolvers = {
Query: {
movie: (_, { id }) => {
// Effectuer un appel gRPC au microservice de films
const client = new movieProto.MovieService('localhost:50051',
grpc.credentials.createInsecure());
return new Promise((resolve, reject) => {
client.getMovie({ movieId: id }, (err, response) => {
if (err) {
reject(err);
} else {
resolve(response.movie);
}
});
});
},
movies: () => {
// Effectuer un appel gRPC au microservice de films
const client = new movieProto.MovieService('localhost:50051',
grpc.credentials.createInsecure());
return new Promise((resolve, reject) => {
client.searchMovies({}, (err, response) => {
if (err) {
reject(err);
} else {
resolve(response.movies);
}
});
});
},
tvShow: (_, { id }) => {
    // Effectuer un appel gRPC au microservice de séries TV
    const client = new tvShowProto.TVShowService('localhost:50052',
    grpc.credentials.createInsecure());
    return new Promise((resolve, reject) => {
    client.getTvshow({ tvShowId: id }, (err, response) => {
    if (err) {
    reject(err);
    } else {
    resolve(response.tv_show);
    }
    });
    });
    },
    tvShows: () => {
    // Effectuer un appel gRPC au microservice de séries TV
    const client = new tvShowProto.TVShowService('localhost:50052',
    grpc.credentials.createInsecure());
    return new Promise((resolve, reject) => {
    client.searchTvshows({}, (err, response) => {
    if (err) {
    reject(err);
    } else {
    resolve(response.tv_shows);
    }
    });
    });
    },
    },
    };
    module.exports = resolvers;