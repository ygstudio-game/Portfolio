import sendContactEmail from "../utils/sendContactEmail.js";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required" 
      });
    }

    // Call Utility
    await sendContactEmail(name, email, message);

    res.status(200).json({ 
      success: true, 
      message: "Message sent successfully!" 
    });

  } catch (error) {
    console.error("Contact Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to send message. Please try again later." 
    });
  }
};