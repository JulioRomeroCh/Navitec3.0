const express  = require ('express');
const router = express.Router ();

const pool = require ('../database');

router.get ('/add_toy', (req, res) => {
    res.render('toy/add_toy');
})

router.post('/add', async (req, res) => {
    const {Toy_Code, Age_Range, Description, Photo, Cost, Name} = req.body;
    const newLink = {
        Toy_Code,
        Age_Range,
        Description,
        Photo,
        Cost,
        Name
    };
    await pool.query("CALL insertToy ('" + newLink.Toy_Code + "','" + newLink.Age_Range + "','" + newLink.Description +"','"+ newLink.Photo + "','"+ newLink.Cost + "','"+ newLink.Name + "')");
    req.flash('success', 'Toy added successfully');
    res.redirect ('/toy');
});

router.get('/', async (req, res) =>{

    const toy = await pool.query("SELECT * FROM toy"); 
    res.render('toy/read_toy', { toy });
    
});

router.get('/delete/:Toy_Code', async (req, res) => {

    const {Toy_Code} = req.params;
    await pool.query("CALL deleteToy ('" + Toy_Code + "')");
    req.flash('success', 'Toy deleted successfully');
    res.redirect('/toy');

});

router.get('/edit_toy/:Toy_Code', async (req, res) => {
    const {Toy_Code} = req.params;
    const ids =  await pool.query ('SELECT * FROM toy WHERE Toy_Code= ?', [Toy_Code]);
    res.render('toy/edit_toy', {toy: ids[0]});
});

router.post('/edit_toy/:Toy_Code', async (req, res) => {
    const {ids} = req.params;
    const {Toy_Code, Age_Range, Description, Photo, Cost, Name} = req.body;
    const newLink = {
        Toy_Code,
        Age_Range,
        Description,
        Photo,
        Cost,
        Name
    };
    await pool.query("CALL updateToy ('" + newLink.Toy_Code + "','" + newLink.Age_Range + "','" + newLink.Description +"','"+ newLink.Photo + "','"+ newLink.Cost + "','"+ newLink.Name + "')");
    req.flash('success', 'Toy updated successfully');
    res.redirect('/toy');
});

module.exports = router;

