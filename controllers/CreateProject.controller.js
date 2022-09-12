const Project = require('../models/Projects');

//Sumbit a project
router.post('/createProject', async (req, res)=> {
    const projects = Project({             //creating a data obj to save in our db
        refId : req.body.title,
        projectId : req.body.description
    })

    try{
        const data = await projects.save();
        res.json(data);
    }catch(e){
        res.send("Error - " + e);
    }
} )