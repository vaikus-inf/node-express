const express = require('express');
//const path = require('path');
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const homeCourses = require('./routes/courses');
const homeAdd = require('./routes/add');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

//Объявляем папку public публичной, чтоб подключение файла стилей работало через /index.css без указания папки
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use('/', homeRoutes);
app.use('/courses', homeCourses);
app.use('/add', homeAdd);

// Так было до подключения express-handlebars
// app.get('/', (req, res) => {   
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });

// app.get('/', (req, res) => {   
//     res.render('index', {
//         title: 'Главная страница',
//         isHome: true
//     });
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});