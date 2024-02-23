const asyncHandler = require('express-async-handler')
const multer = require('multer')
const Home = require('../models/homeModel')
const fs = require('fs')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const createHome = asyncHandler(async (req, res) => {
  try {
    // Check if any Home objects exist in the database
    const existingHome = await Home.findOne();
    if (existingHome) {
      return res
        .status(400)
        .json({ success: false, code: 400, message: "A Home already exists" });
    } else {
      const { title } = req.body;

      // Check if req.files is populated
      if (!req.files || req.files.length === 0) {
        return res
          .status(400)
          .json({ success: false, code: 400, message: "No files uploaded" });
      }

      const images = req.files.map((file) => {
        // Store file paths instead of URLs
        return file.path;
      });

      const newHome = new Home({ title, images });
      await newHome.save();

      res.status(201).json({
        success: true,
        code: 201,
        message: "Home created successfully",
        home: newHome,
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, code: 500, message: "Internal server error" });
  }
});



const getHome = asyncHandler(async (req, res) => {
  try {
    // Find the home in the database
    const home = await Home.findOne();

    // If no home is found, return a success response with a blank object
    if (!home) {
      return res.status(200).json({ success: true, code: 200, message: "No home found", home: {} });
    }

    // If a home is found, return it in the response
    res.status(200).json({ success: true, code: 200, message: "Home found", home });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, code: 500, message: "Internal server error" });
  }
});




const updateHome = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const home = await Home.findById(id);

    if (!home) {
      return res.status(404).json({ success: false, code: 404, message: "Home not found" });
    }

    const { title } = req.body;
    let newImages = [];

    // Check if files are uploaded
    if (req.files && req.files.length > 0) {
      // If files are uploaded, delete old images (if any)
      for (const imagePath of home.images) {
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath); // Delete the image file
        }
      }
      // Store new images paths
      newImages = req.files.map(file => file.path); // Store file paths instead of URLs
    }

    // Update title and images
    home.title = title;
    home.images = newImages;

    await home.save();

    res.status(200).json({ success: true, code: 200, message: "Home updated successfully", home });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, code: 500, message: "Internal server error" });
  }
});




const deleteHome = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Find the home record by ID
    const home = await Home.findById(id);

    if (!home) {
      return res.status(404).json({ success: false,code:404, message: 'Home not found' });
    }

    // Delete the associated images from the file system if they exist
    if (home.images && home.images.length > 0) {
      for (const imagePath of home.images) {
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath); // Delete the image file
        }
      }
    }

    // Delete the home record from the database
    const deletedHome = await Home.findByIdAndDelete(id);

    // Return success response
    res.json({ success: true, code: 200, message: 'Home deleted successfully', deletedHome });
  } catch (error) {
    console.error('Error deleting home:', error);
    res.status(500).json({ success: false, code: 500, message: 'Internal server error' });
  }
});



module.exports = { upload, createHome, getHome, updateHome, deleteHome }