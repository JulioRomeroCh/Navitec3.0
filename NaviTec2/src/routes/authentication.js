const express  = require ('express');
const router = express.Router ();
const pool = require ('../database');

router.get('/signin', (req, res)=>{
    res.render('sign/signin')

});

/*
router.post('/signin', (req, res) =>{
    console.log(req.body)

    res.send('Hola XXX')

});
*/

router.post('/signin', async (req, res) => {
    const {Username} = req.body;
    const newLink = {
        Username
    };
    console.log(newLink);
    const user =  await pool.query ("SELECT (CASE WHEN EXISTS(SELECT NULL FROM user WHERE username='"+ newLink.Username +"') THEN 1 ELSE 0 END ) AS boolean FROM user limit 0,1;");
    console.log(user);
    //SELECT (CASE WHEN EXISTS(SELECT NULL FROM user WHERE username='"+ newLink.Username +"') THEN 1 ELSE 0 END ) AS boolean FROM user limit 0,1;

    //res.render('santas_assistant/edit_santas_assistant', {santas_assistant: ids[0]});

});

module.exports = router;