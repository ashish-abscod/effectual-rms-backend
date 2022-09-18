const projectModel = require("../models/Projects.model");
const {cloudinary} = require("./Files.controller");

exports.getProjects = async (req, res) => {
  try {
    const data = await projectModel.find();
    res.json(data);
  } catch (e) {
    res.send("Error - " + e);
  }
};

exports.createProject = async (req, res) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(
      req.body.attachment,
      {
        upload_preset: "attachments",
      }
    );

    const data = projectModel({
      searchObject: req.body.searchObject,
      claims: req.body.claims,
      reqDelivery: req.body.reqDelivery,
      projectName: req.body.projectName,
      requesterName: req.body.requesterName,
      deliveryDate: req.body.deliveryDate,
      priorArtDate: req.body.priorArtDate,
      emailContent: req.body.emailContent,
      info: req.body.info,
      status: req.body.status,
      projectManager: req.body.projectManager,
      requestedDate: req.body.requestedDate,
      patentNumber: req.body.patentNumber,
      createdById: req.body.createdById,
      completedDate: req.body.completedDate,
      jurisdiction: req.body.jurisdiction,
      include: req.body.include,
      technicalField: req.body.technicalField,
      standard: req.body.standard,
      sso: req.body.sso,
      usipr: req.body.usipr,
      impClaim: req.body.impClaim,
      nonImpClaim: req.body.nonImpClaim,
      attachment: uploadResponse.secure_url,
    });
    try {
      await data.save();
      res.json({ data: data, err: null, code: 200 });
    } catch (error) {
      console.log("error: ", error);
      res.json({ error: error, data: null, code: 403 });
    }
  } catch (error) {
    console.log("error: ", error);
    res.json({ error: error, data: null, code: 500 });
  }
};

exports.updateProject = async (req, res) => {
  const result = await projectModel.updateOne(
    { _id: req.params.id },

    { $set: req.body }
  );
  res.send(result);
  console.log(req.params.id);
};
