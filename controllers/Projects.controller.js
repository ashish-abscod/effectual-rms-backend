const projectModel = require("../models/Projects.model");
const { cloudinary } = require("./Files.controller");

exports.getProjects = async (req, res) => {
  try {
    const data = await projectModel.find();
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

exports.createProject = async (req, res) => {
  try {
    const data = projectModel({
      searchObject: req.body.SearchObject,
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
      requestedDate: req.body.RequestedDate,
      patentNumber: req.body.PatentNumber,
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
    await data.save();
    res.json({ data: data, err: null, code: 200 });
  } catch (error) {
    console.log("error: ", error);
    res.json({ error: error, data: null, code: 500 });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const result = await projectModel.findOneAndUpdate(
      { projectId: req.params.id },
      {
        searchObject: req.body.SearchObject,
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
        requestedDate: req.body.RequestedDate,
        patentNumber: req.body.PatentNumber,
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
    res.send({ Message: "Successfully updated project!", code: 200 });
  } catch (err) {
    res.send(err);
  }
};
