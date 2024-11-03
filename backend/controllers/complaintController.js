const { default: mongoose } = require("mongoose");
const { Complaint } = require("../models");

const createComplaint = async (req, res) => {
  try {
    const { title, body, issuerId } = req.body;

    const newComplaint = new Complaint({
      title,
      body,
      issuerId,
      status: "Pending",
    });

    const savedComplaint = await newComplaint.save();

    res.status(201).json({
      message: "Complaint created successfully",
      data: savedComplaint,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating complaint", error: error.message });
  }
};

const getComplaintsByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const complaints = await Complaint.find({ status });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching complaints by status",
      error: error.message,
    });
  }
};

const getAllComplaintsByIssuerId = async (req, res) => {
  try {
    const { issuerId } = req.params;
    const { status, sort } = req.query;

    const filter = { issuerId };

    if (status) {
      filter.status = status;
    }

    const sortOrder = sort === "date" ? 1 : -1;

    const complaints = await Complaint.find(filter).sort({
      createdAt: sortOrder,
    });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching complaints by issuer ID",
      error: error.message,
    });
  }
};

const getAllComplaints = async (req, res) => {
  try {
    const { status, sort } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    const sortOrder = sort === "date" ? 1 : -1;

    const complaints = await Complaint.find(filter)
      .sort({
        createdAt: sortOrder,
      })
      .populate("issuerId", ["username"]);

    res.status(200).json(complaints);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching all complaints", error: error.message });
  }
};

const getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;

    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching complaint by ID",
      error: error.message,
    });
  }
};

const deleteComplaintById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedComplaint = await Complaint.findByIdAndDelete(id);

    if (!deletedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting complaint",
      error: error.message,
    });
  }
};

const resolveComplaintById = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    if (!reply) {
      return res
        .status(400)
        .json({ message: "Reply is required to resolve the complaint" });
    }

    const resolvedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { status: "Resolved", reply },
      { new: true, runValidators: true }
    );

    if (!resolvedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json({
      message: "Complaint resolved successfully",
      data: resolvedComplaint,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error resolving complaint",
      error: error.message,
    });
  }
};

module.exports = {
  createComplaint,
  getComplaintsByStatus,
  getAllComplaintsByIssuerId,
  getAllComplaints,
  getComplaintById,
  deleteComplaintById,
  resolveComplaintById,
};
