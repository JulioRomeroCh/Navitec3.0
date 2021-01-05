const express  = require ('express');
const router = express.Router ();

//Database connection
const pool = require ('../database');

//Change the name add
router.get ('/add_behavior', (req, res) => {
    res.render('behavior/add_behavior');
})

//Recibe los datos del formulario
router.post('/add', async (req, res) => {
    const {Behavior_ID, Date, Indication, Description} = req.body;
    //Save it in a new object
    //Create new object
    const newLink = {
        Behavior_ID,
        Date,
        Indication,
        Description
    };

    console.log(newLink);

    //Insert data in database
    await pool.query("CALL insertBehavior ('" + newLink.Behavior_ID + "','" + newLink.Date + "','" + newLink.Indication +"','"+ newLink.Description + "')")
    req.flash('success', 'Behavior added successfully');
    res.redirect ('/behavior');
});




router.get('/', async (req, res) =>{

    const behavior = await pool.query("SELECT * FROM behavior"); //CALL readAllSantasAssistant
    console.log(behavior);
    res.render('behavior/read_behavior', { behavior });

});


router.get('/delete/:Behavior_ID', async (req, res) => {

    const {Behavior_ID} = req.params;
    await pool.query("CALL deleteBehavior ('" + Behavior_ID + "')");
    req.flash('success', 'Behavior deleted successfully');
    res.redirect('/behavior');

});


router.get('/edit_behavior/:Behavior_ID', async (req, res) => {
    const {Behavior_ID} = req.params;
    const ids =  await pool.query ('SELECT * FROM behavior WHERE behavior_id= ?', [Behavior_ID]);
    //"CALL readSantasAssistant ('" + Assistant_ID + "')"
    //'SELECT * FROM santas_assistant WHERE Assistant_ID= ?', [Assistant_ID]
    console.log(ids[0]);

    res.render('behavior/edit_behavior', {behavior: ids[0]});

});

router.post('/edit_behavior/:Behavior_ID', async (req, res) => {
    const {ids} = req.params;
    const {Behavior_ID, Date, Indication, Description} = req.body;
    const newLink = {
        Behavior_ID,
        Date,
        Indication,
        Description
    };
    await pool.query("CALL updateBehavior ('" + newLink.Behavior_ID + "','" + newLink.Date + "','" + newLink.Indication +"','"+ newLink.Description + "')");
    req.flash('success', 'Behavior updated successfully');
    res.redirect('/behavior');
});


module.exports = router;

