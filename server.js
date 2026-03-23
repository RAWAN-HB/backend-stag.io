const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const offerRoutes = require("./routes/offerRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const conventionRoutes = require("./routes/conventionRoutes");
const supervisorRoutes = require("./routes/supervisorRoutes");
const companyRoutes = require("./routes/companyRoutes");
const superAdminRoutes = require("./routes/superAdminRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/conventions", conventionRoutes);
app.use("/api/supervisor", supervisorRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/super", superAdminRoutes);

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));

// test route
app.get("/", (req,res)=>{
    res.send("Stag.io backend running");
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});