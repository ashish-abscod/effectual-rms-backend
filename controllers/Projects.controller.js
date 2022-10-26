const projectModel = require("../models/Projects.model.js");
const projectSeriesModel = require("../models/ProjectSeries.model.js");
const AssignedModel = require("../models/AssignedUsers.model");
const date = require('date-and-time');

exports.getProjects = async (req, res) => {
  try {
    const data = await projectModel.find().sort({"requestedDate":"desc"});
    res.json(data);
  } catch (e) {
    res.send("Error - " + e);
  }
};

exports.getOneProject = async (req, res) => {
  try {
    const data = await projectModel.findOne({ projectId: req.params.id });
    res.json(data);
  } catch (error) {
    res.send(error);
  }
};

exports.getProjectsAssignedToUser = async (req, res)=> {
  try {
    //finding those prjectsIds in which user is assigned with given userId
    const data = await AssignedModel.find({"userId._id":req.params.userId}).select({projectId:1, _id:0});
    //making array of projectIds to pass in $in
    const projectIds = data?.map(item => item?.projectId);
    //finding all projects with in array of project Ids.
    const projects = await projectModel.find({projectId : {$in : projectIds}});
    res.json(projects);
  } catch (error) {
    res.json({msg:"Something went wrong.", status:"failed"})
  }
}

exports.findSearchObject = async (req, res) => {
  try {
    const data = await projectModel.findOne({
      searchObject: req.body.searchObject,
    });

    if (data?.searchObject) {
      return res.json({
        msg: "Search Object already exist!",
        status: "failed",
      });
    }
    return res.json({
      msg: "This is an unique Search Object.",
      status: "success",
    });
  } catch (error) {
    return res.json({ msg: "Something went wrong!", status: "failed" });
  }
};

exports.createProject = async (req, res) => {
  try {
    //getting incremented series of projectId
    const result = await projectSeriesModel.findOneAndUpdate(
      {},
      { $inc: { series: 1 } },
      { new: true }
    );

    //logic to create a custom projectId
    const now = new Date();
    const formattedToday = date.format(now, "DDMMYY");
    const generatedProjectId = `EKS-${formattedToday}-${result?.series}`;

    const data = projectModel({
      projectId: generatedProjectId,
      searchObject: req.body.SearchObject,
      patentNumber: req.body.KnownPriorArt,
      claims: req.body.ClaimsToBeSearched,
      reqDelivery: req.body.RequirementForDelivery,
      projectName: req.body.ProjectName,
      requesterName: req.body.requesterName,
      deliveryDate: req.body.RequirementDeliveryDate,
      priorArtDate: req.body.PriorArtCuttOffDate,
      emailContent: req.body.emailContent,
      info: req.body.UsefulInformationForSearch,
      status: req.body.Status,
      projectManager: req.body.ProjectManager,
      requestedDate: date.format(now,"YYYY-MM-DD HH:mm:ss"),
      createdById: req.body.CreatedById,
      completedDate: req.body.CompletedDate,
      jurisdiction: req.body.Jurisdiction,
      include: req.body.Include,
      technicalField: req.body.TechnicalField,
      standard: req.body.StandardRelated,
      sso: req.body.SSONeeded,
      usipr: req.body.USIPRSpecial,
      impClaim: req.body.ImportantClaims,
      nonImpClaim: req.body.UnimportantClaims,
    });
    
    const info =await data.save();
    res.json({ ...info._doc, msg : "Project has been created Successfully!", status : "success" });
  } catch (error) {
    res.json({ msg: "Sorry, project could not be created due to server issue", success: "failed" });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const result = await projectModel.findOneAndUpdate(
      { projectId: req.params.id },
      {
        searchObject: req.body.SearchObject,
        patentNumber: req.body.KnownPriorArt,
        claims: req.body.ClaimsToBeSearched,
        reqDelivery: req.body.RequirementForDelivery,
        projectName: req.body.ProjectName,
        requesterName: req.body.requesterName,
        deliveryDate: req.body.RequirementDeliveryDate,
        priorArtDate: req.body.PriorArtCuttOffDate,
        emailContent: req.body.EmailContent,
        info: req.body.UsefulInformationForSearch,
        status: req.body.Status,
        projectManager: req.body.ProjectManager,
        createdById: req.body.CreatedById,
        completedDate: req.body.CompletedDate,
        jurisdiction: req.body.Jurisdiction,
        include: req.body.Include,
        technicalField: req.body.TechnicalField,
        standard: req.body.StandardRelated,
        sso: req.body.SSONeeded,
        usipr: req.body.USIPRSpecial,
        impClaim: req.body.ImportantClaims,
        nonImpClaim: req.body.UnimportantClaims,
      }
    );
    console.log(result);
    res.json({...result._doc, msg: "Project Successfully updated!", status : "success" });
  } catch (err) {
    res.json({ err, msg: "Sorry, could not update the project due to server issue!", status : "failed" });
  }
};
