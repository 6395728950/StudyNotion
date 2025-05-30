const { contactUsEmail } = require("../mail_templates/contactFormRes")
const mailsender = require("../utils/mailsender")

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
  console.log("value of email",email);
  console.log("value of firstName",firstname);
  console.log("value of lastName",lastname);
  console.log("value of message",message);
  console.log("value of phoneNo",phoneNo);
  try {
    const emailRes = await mailsender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    )
    console.log("Email Res ", emailRes)
    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}