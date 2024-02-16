const asyncHandler = require('express-async-handler')
const multer = require('multer')
const OurBrands = require('../models/ourBrandsModel')
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
  
  const createOurBrand = asyncHandler(async (req, res) => {
    try {
      // Check if any Home objects exist in the database
      const existingBrand = await OurBrands.findOne();
      if (existingBrand) {
        return res
          .status(400)
          .json({ success: false, code: 400, message: "A Brand already exists" });
      } else {
        // Check if req.files is populated
        if (!req.files || req.files.length === 0) {
          return res
            .status(400)
            .json({ success: false, code: 400, message: "No files uploaded" });
        }
  
        const brandImages = req.files.map((file) => {
          // Store file paths instead of URLs
          return file.path; 
        });
  
        const newBrands = new OurBrands({ brandImages });
        await newBrands.save();
  
        res.status(201).json({
          success: true,
          code: 201,
          message: "Brand created successfully",
          brand: newBrands,
        });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, code: 500, message: "Internal server error" });
    }
  });



const getOurBrands = asyncHandler(async (req, res) => {
    try {
        // Find the home in the database
        const brand = await OurBrands.findOne();

        // If no home is found, return a 404 status code with a message
        if (!brand) {
            return res.status(404).json({ success: false, code: 404, message: "No brand found" });
        }

        // If a home is found, return it in the response
        res.status(200).json({ success: true, code: 200, message: "brand found", brand });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, code: 500, message: "Internal server error" });
    }
});



const updateOurBrands = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const brand = await OurBrands.findById(id);

        if (!brand) {
            return res.status(404).json({ success: false, code: 404, message: "Brand not found" });
        }

        // Check if files are uploaded
        if (!req.files || req.files.length === 0) {
            await brand.save();

            return res.status(200).json({ success: true, code: 200, message: "Brand updated successfully", brand });
        }

        // Delete old images from the file system
        for (const imagePath of brand.brandImages) {
            fs.unlinkSync(imagePath); // Delete the image file
        }

        // Files are uploaded, update title and replace images
        const newImages = req.files.map(file => file.path); 
        brand.brandImages = newImages;

        await brand.save();

        res.status(200).json({ success: true, code: 200, message: "Brand updated successfully", brand });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, code: 500, message: "Internal server error" });
    }
});



const deleteOurBrands = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        // Find the home record by ID
        const brand = await OurBrands.findById(id);

        if (!brand) {
            return res.status(404).json({ success: false, message: 'Brand not found' });
        }

        // Delete the associated images from the file system
        for (const imagePath of brand.brandImages) {
            fs.unlinkSync(imagePath); // Delete the image file
        }

        // Delete the home record from the database
        const deletedBrand = await OurBrands.findByIdAndDelete(id);

        // Return success response
        res.json({ success: true, message: 'Brand deleted successfully', deletedBrand });
    } catch (error) {
        console.error('Error deleting brand:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


 module.exports = {upload, createOurBrand,getOurBrands, updateOurBrands, deleteOurBrands }