const projectModel = require("../models/Projects.model.js");
const projectSeriesModel = require("../models/ProjectSeries.model.js");

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
    const today = new Date();
    const yy = String(today.getFullYear()).slice(-2);
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    const formattedToday = dd + mm + yy;
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
      requestedDate: req.body.RequestedDate,
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
    res.json({ ...info._doc, msg : "Project Created Successfully!", status : "success" });
  } catch (error) {
    res.json({ msg: "Sorry, Could not create the project due to server issue", success: "failed" });
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
        requestedDate: req.body.RequestedDate,
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
    res.json({...result._doc, msg: "project Successfully updated!", status : "success" });
  } catch (err) {
    res.json({ err, msg: "Sorry, Could not update the project due to server issue!", status : "failed" });
  }
};
