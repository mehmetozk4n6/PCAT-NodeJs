const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageController');

const app = express();

// connect DB
mongoose.connect('mongodb://localhost/pcast-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // usedFindAndModify: false,
});
// pcast-test-db varsa üzerine yazar yoksa oluşturur.

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

const port = 3000;

// ROUTES

app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
// form action daki yönlendirmeyi yakalıyoruz
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);

app.get('/photos/edit/:id', pageController.getEditPage);

app.listen(port, (req, res) => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
