const express  = require ('express');
const router = express.Router ();

//Database connection
const pool = require ('../database');

//Change the name add
router.get ('/add_santas_assistant', (req, res) => {
    res.render('santas_assistant/add_santas_assistant');
})

//Recibe los datos del formulario
router.post('/add', async (req, res) => {
    const {Assistant_ID, Name, Start_Date, Username} = req.body;
    //Save it in a new object
    //Create new object
    const newLink = {
        Assistant_ID,
        Name,
        Start_Date,
        Username
    };

    console.log(newLink);

    //Insert data in database
    await pool.query("CALL insertAssistant ('" + newLink.Assistant_ID + "','" + newLink.Name + "','" + newLink.Start_Date +"','"+ newLink.Username + "')")
    req.flash('success', 'Santas Assistant added successfully');
    res.redirect ('/santas_assistant');
});




router.get('/', async (req, res) =>{

    const santas_assistant = await pool.query("SELECT * FROM santas_assistant"); //CALL readAllSantasAssistant
    console.log(santas_assistant);
    res.render('santas_assistant/read_santas_assistant', { santas_assistant });
    
});


router.get('/delete/:Assistant_ID', async (req, res) => {

    const {Assistant_ID} = req.params;
    await pool.query("CALL deleteSantasAssistant ('" + Assistant_ID + "')");
    req.flash('success', 'Santas Assistant deleted successfully');
    res.redirect('/santas_assistant');

});


router.get('/edit_santas_assistant/:Assistant_ID', async (req, res) => {
    const {Assistant_ID} = req.params;
    const ids =  await pool.query ('SELECT * FROM santas_assistant WHERE Assistant_ID= ?', [Assistant_ID]);
    //"CALL readSantasAssistant ('" + Assistant_ID + "')"
    //'SELECT * FROM santas_assistant WHERE Assistant_ID= ?', [Assistant_ID]
    console.log(ids[0]);

    res.render('santas_assistant/edit_santas_assistant', {santas_assistant: ids[0]});

});

router.post('/edit_santas_assistant/:Assistant_ID', async (req, res) => {
    const {ids} = req.params;
    const {Assistant_ID, Name, Start_Date, Username} = req.body;
    const newLink = {
        Assistant_ID,
        Name,
        Start_Date,
        Username
    };
    await pool.query("CALL updateSantasAssistant ('" + newLink.Assistant_ID + "','" + newLink.Name + "','" + newLink.Start_Date +"','"+ newLink.Username + "')");
    req.flash('success', 'Santas Assistant updated successfully');
    res.redirect('/santas_assistant');
});




module.exports = router;

