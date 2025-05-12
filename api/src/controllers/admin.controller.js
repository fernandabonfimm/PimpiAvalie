const AdminModel = require("../models/admin.model");
const moongoose = require("mongoose");

exports.createAdmin = async (req, res) => {
  try {
    const admin = new AdminModel(req.body);
    await admin.save();
    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (error) {
    res.status(400).json({ message: "Error creating admin", error });
  }
};

exports.getIdById = async (req, res) => {
  try {
    const admin = await AdminModel.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin", error });
  }
};

exports.loginAdmin = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const admin = await AdminModel.find({ email: email });
    if (admin.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.status(200).json({ message: "Login successful", admin });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
