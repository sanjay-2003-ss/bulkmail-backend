const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.json());
app.use(cors());

// Define schema
const credentialsSchema = new mongoose.Schema({}, { strict: false });
const credentials = mongoose.model("credentials", credentialsSchema, "bulkmail");

// Connect to MongoDB
mongoose.connect("mongodb+srv://Sanjay:2003@cluster0.uu7enka.mongodb.net/passkey?appName=Cluster0", {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
.then(() => {
    console.log("DB is connected");
})
.catch((err) => {
    console.log(" Failed to connect to DB:", err.message);
});

app.post("/sendemail", async (req, res) => {
    try {
        // Check database connection
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({ 
                success: false,
                status: "Database not connected",
                message: "Database not connected" 
            });
        }

        const { msg, emails } = req.body;
        
        // Validate input
        if (!msg || !msg.trim()) {
            return res.status(400).json({ 
                success: false,
                status: "Message is required",
                message: "Message is required" 
            });
        }

        if (!emails || emails.length === 0) {
            return res.status(400).json({ 
                success: false,
                status: "No email addresses provided",
                message: "No email addresses provided" 
            });
        }

        // Filter out empty/invalid emails
        const validEmails = emails.filter(email => 
            email && 
            typeof email === 'string' && 
            email.trim() !== '' &&
            email.includes('@')
        );

        if (validEmails.length === 0) {
            return res.status(400).json({ 
                success: false,
                status: "No valid email addresses found",
                message: "No valid email addresses found" 
            });
        }

        console.log(`📧 Preparing to send to ${validEmails.length} recipients`);

        // Fetch credentials (if needed from DB)
        const data = await credentials.find();
        console.log("Credentials fetched from DB");

        // Create transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'sanjaykiruthish@gmail.com',
                pass: 'ynee rhrs vmah snqt', // Use env variables in production
            },
        });

        // Verify transporter
        try {
            await transporter.verify();
            console.log(" Email transporter verified");
        } catch (verifyError) {
            console.error(" Transporter verification failed:", verifyError.message);
            return res.status(500).json({ 
                success: false,
                status: "Email authentication failed. Please check Gmail credentials.",
                message: verifyError.message 
            });
        }

        // Send emails
        let successCount = 0;
        let failCount = 0;
        const results = [];

        for (let i = 0; i < validEmails.length; i++) {
            try {
                await transporter.sendMail({
                    from: "sanjaykiruthish@gmail.com",
                    to: validEmails[i],
                    subject: "A message from BulkMail app",
                    text: msg
                });
                
                successCount++;
                console.log(` [${i + 1}/${validEmails.length}] Email sent to: ${validEmails[i]}`);
                results.push({ email: validEmails[i], success: true });
                
            } catch (error) {
                failCount++;
                console.error(` [${i + 1}/${validEmails.length}] Failed to send to: ${validEmails[i]}`, error.message);
                results.push({ email: validEmails[i], success: false, error: error.message });
            }
        }

        console.log(`\n📊 Summary: ${successCount} sent, ${failCount} failed out of ${validEmails.length} total\n`);

        res.json({ 
            success: true,
            status: `Successfully sent ${successCount} out of ${validEmails.length} emails`,
            message: `Emails sent: ${successCount}, Failed: ${failCount}`,
            results: {
                total: validEmails.length,
                sent: successCount,
                failed: failCount,
                details: results
            }
        });

    } catch (error) {
        console.error(" Server Error:", error);
        res.status(500).json({ 
            success: false,
            status: "Server error occurred",
            message: error.message 
        });
    }
});

// Health check
app.get("/health", (req, res) => {
    res.json({ 
        status: "ok", 
        dbConnected: mongoose.connection.readyState === 1 
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(` Server started on http://localhost:${PORT}`);
    console.log(` Health check: http://localhost:${PORT}/health`);
});