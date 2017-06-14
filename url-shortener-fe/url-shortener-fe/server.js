const fs = require('fs');
const connect = require('connect');
const serveStatic = require('serve-static');

const generateCompiledConfig = () => {
    const template = fs.readFileSync('templates/config.js', 'utf8');
    return new Promise((resolve, reject) => {
        const port = process.env.URL_SHORTENER_MASTER_1_PORT_3000_TCP_PORT;
        resolve(template.replace('{{MASTER_URL}}', `http://localhost:${port}`));
    });
};

generateCompiledConfig()
    .then(compiledConfig => {
        const serveCompiledConfig = (req, res, next) => {
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(compiledConfig);
        };

        connect()
            .use(serveStatic(`${__dirname}/client`))
            .use('/config.js', serveCompiledConfig)
            .listen(8081, () => console.log('Server running on 8081...'));
    })
    .catch(err => console.error(err));
