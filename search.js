const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const Movie = require('./database');
const path = require('path');

mongoose.connect('mongodb://localhost:27017/movies') 
    .then(()=> console.log('Connected...'))
    .catch (err => console.log(err));
app.get('/search', (req,res)=>{
    res.sendFile(path.join(__dirname, 'search.html'));
})	
	
//route to return sesrch results
app.get('/search-results', async(req,res)=>{
    const search = req.query.searchTerm;
    try{
        const movies = await Movie.find({ title: new RegExp(search, 'i') }).select('title genre').exec();
        
        console.log(movies);
        res.json(movies);

    } catch (err){
        console.error(err);
        res.status(500).send('Server Error');
    }
})
app.listen(PORT, () => console.log(`Server is now listening on port ${PORT}`));

