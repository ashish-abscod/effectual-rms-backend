const projects = require('../models/projects.model');

exports.getProjects = async (req, res) => { 
    try{
        const data = await projects.find();
        res.json(data);
    }catch(e){
        res.send("Error - " + e);
    }
 }


exports.createProject = async (req, res) => {
    const data = projects({
        refId : req.body.refId,
        projectId : req.body.projectId
    })
    try {
        const savedProject = await data.save();
        res.json(savedProject);
    } catch (e) {
        res.send("Error - " + e)
    }
}