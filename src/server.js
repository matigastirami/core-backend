import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import rfs from 'rotating-file-stream';

import * as dbConnection from './server/database/mongodb'
import RoutesConfig from './server/routes'

const app = express();

app.set('port', process.env.PORT || 4000);

app.use(webpackDevMiddleware(webpack(webpackConfig)));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'client', 'img')))


let logDirectory = path.join(__dirname, '..', 'logs')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

var accessLogStream = rfs('access.txt', {
    interval: '10M', // rotate daily
    path: logDirectory
  })

app.use(morgan("dev", {
    stream: accessLogStream
}))

RoutesConfig(app);

dbConnection.connect()
    .then(
        () => {
            console.log('connectado a la BD OK')
        },
        (err) => {
            console.log('ocurrió un error al conectarse a la base de datos', err)
        }
    )

/*app.set('view engine', 'ejs');

app.use("/", (req, res) => {
    res.render('./client/index.ejs')
})*/

app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
})
