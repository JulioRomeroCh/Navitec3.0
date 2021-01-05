const express  = require ('express');
const router = express.Router ();

//Database connection
const pool = require ('../database');

//Change the name add
router.get ('/add_person', (req, res) => {
    res.render('person/add_person');
})

//Recibe los datos del formulario
router.post('/add', async (req, res) => {
    const {Nid, Email, Birth_Date, Name, Lastname, Username} = req.body;
    //Save it in a new object
    //Create new object
    const newLink = {
        Nid,
        Email,
        Birth_Date,
        Name,
        Lastname,
        Username
    };



    //Insert data in database
    await pool.query("CALL insertPerson ('" + newLink.Nid + "','" + newLink.Email + "','" + newLink.Birth_Date +  "','" + newLink.Name + "','" + newLink.Lastname + "','" + newLink.Username + "')")
    req.flash('success', 'Person added successfully');
    res.redirect ('/person');
});




router.get('/', async (req, res) =>{

    const person = await pool.query("SELECT * FROM person"); //CALL readAllSantasAssistant
    console.log(person);
    res.render('person/read_person', { person });

});


router.get('/delete/:Nid', async (req, res) => {

    const {Nid} = req.params;
    await pool.query("CALL deletePerson ('" + Nid + "')");
    req.flash('success', 'Person deleted successfully');
    res.redirect('/person');

});


router.get('/edit_person/:Nid', async (req, res) => {
    const {Nid} = req.params;
    const ids =  await pool.query ('SELECT * FROM person WHERE nid= ?', [Nid]);
    console.log(ids[0]);

    res.render('person/edit_person', {person: ids[0]});

});

router.post('/edit_person/:Nid', async (req, res) => {
    const {ids} = req.params;
    const {Nid, Email, Birth_Date, Name, Lastname, Username} = req.body;
    const newLink = {
        Nid,
        Email,
        Birth_Date,
        Name,
        Lastname,
        Username
    };
    console.log(newLink);
    await pool.query("CALL updatePerson ('" + newLink.Nid + "','" + newLink.Email + "','" + newLink.Birth_Date +  "','" + newLink.Name + "','" + newLink.Lastname + "','" + newLink.Username + "')");
    req.flash('success', 'Person updated successfully');
    res.redirect('/person');
});


module.exports = router;

