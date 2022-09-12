const Projects = require('../models/projects.model');

exports.getProjects = async (req, res) => { 
    try{
        const data = await Projects.find();
        res.json(data);
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