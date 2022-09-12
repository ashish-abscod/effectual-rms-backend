const Projects = require('../models/projects.model');

exports.getProjects = async (req, res) => { 
    try{
        const data = await Projects.find();
        res.json(data);
    }catch(e){
        res.send("Error - " + e);
    }
 }

 exports.bcryptPassword = async (req, res) => { 
    try{
        const data = await Projects.find({password:req.body.password});
        console.log(data)
        res.json(data);
        const salt = await bcrypt.genSalt();
        const hashedPssword = await bcrypt.hash(Projects.password, salt);
        Projects.password = hashedPssword;
        await Projects.updateMany(data);
        Projects.password = undefined;
        response.json({ data: Projects, err: null, code: 200 });
    }catch(e){
        res.send("Error - " + e);
    }
 }


exports.createProject = async (req, res) => {
    const projects = Projects({
        refId : req.body.refId,
        projectId : req.body.projectId
    })
    try {
        const savedProject = await projects.save();
        res.json(savedProject);
    } catch (e) {
        res.send("Error - " + e)
    }
}