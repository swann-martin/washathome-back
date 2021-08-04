
const options = {
    swaggerDefinition: {
        info: {
            description: 'A server REST API',
            title: 'Whash@Home',
            version: '1.0.0',
        },
        host: `localhost:${process.env.PORT}`,
        basePath: '/v1',
        produces: [
            "application/json"
        ],
        schemes: ['http','https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['../../app/**/*.js'] //Path to the API handle folder
};

module.exports = options;