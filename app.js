const express = require('express');
const app = express();
const port = 3000;
const path = require('path');


const livereload = require('livereload');
const connectLivereload = require('connect-livereload');
const liveReloadServer = livereload.createServer();


const mainRouter = require('./routers/main');

app.set('view engine',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

liveReloadServer.watch(path.join(__dirname, 'public'));
app.use(connectLivereload());

app.use('/', mainRouter)

liveReloadServer.server.once('connection',()=>{
    setTimeout(() =>{
        liveReloadServer.refresh('/')
    }, 50 );
})

app.get('/',(req,res) => res.sendFile(path.join(__dirname, 'views', 'home.html')));
app.get('/about',(req,res) => res.sendFile(path.join(__dirname, 'views', 'about.html')));

app.listen(port,() => console.log(`servidor levantado en http://localhost:${port}`));


