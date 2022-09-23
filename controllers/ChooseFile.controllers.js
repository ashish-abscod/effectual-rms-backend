const { cloudinary } = require("./Files.controller");
const AttachmentModel = require("../models/ChooseFile.projects");

exports.createFile = async (req, res) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(req.body.file, {
      resource_type: "raw",
      upload_preset: "attachments",
    });

    const data = AttachmentModel({
      file: uploadResponse.secure_url,
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
