const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");

let gfsBucket;

// Initialize GridFSBucket once the connection is open
mongoose.connection.once("open", () => {
  gfsBucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads",
  });
});

const getImage = async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.id);

    if (!gfsBucket) {
      return res.status(500).send("File storage is not initialized");
    }

    // Find the image file in the GridFS collection
    const file = await gfsBucket.find({ _id: fileId }).toArray();
    if (!file || file.length === 0) {
      return res.status(404).send("Image not found");
    }

    // Ensure the content type is an image
    const contentType = file[0].contentType;
    if (!contentType.startsWith("image/")) {
      return res.status(400).send("The requested file is not an image");
    }

    // Set the appropriate content type for the image
    res.setHeader("Content-Type", contentType);

    // Stream the image data to the response
    const downloadStream = gfsBucket.openDownloadStream(fileId);
    downloadStream.pipe(res);

    downloadStream.on("error", (err) => {
      console.error("Error streaming image:", err);
      res.status(500).send("An error occurred while retrieving the image");
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).send("An error occurred while fetching the image");
  }
};

const getPdf = async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.id);

    if (!gfsBucket) {
      return res.status(500).send("File storage is not initialized");
    }

    // Find the PDF file in the GridFS collection
    const file = await gfsBucket.find({ _id: fileId }).toArray();
    if (!file || file.length === 0) {
      return res.status(404).send("PDF not found");
    }

    // Ensure the content type is a PDF
    const contentType = file[0].contentType;
    if (contentType !== "application/pdf") {
      return res.status(400).send("The requested file is not a PDF");
    }

    // Set headers for PDF download or inline display
    res.setHeader("Content-Type", contentType);
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${file[0].filename}"`
    );

    // Stream the PDF data to the response
    const downloadStream = gfsBucket.openDownloadStream(fileId);
    downloadStream.pipe(res);

    downloadStream.on("error", (err) => {
      console.error("Error streaming PDF:", err);
      res.status(500).send("An error occurred while retrieving the PDF");
    });
  } catch (error) {
    console.error("Error fetching PDF:", error);
    res.status(500).send("An error occurred while fetching the PDF");
  }
};

module.exports = {
    getImage,
    getPdf,
};
