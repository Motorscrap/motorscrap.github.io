const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.API_KEY);
const to = process.env.TO_EMAIL;
const from = process.env.FROM_EMAIL;

// @desc          Email from quote
// @route         POST /api/v1/quote
// @access        Private (cors origin)
exports.quote = async (req, res, _next) => {
  if (!req.body) return res.status(400);

  let { subject, contactNumber, vehicleReg, postCode } = req.body;

  const msg = {
    to,
    from,
    subject: subject,
    text: `
      Contact Number: ${contactNumber}\n
      Vehicle Registration: ${vehicleReg}\n
      Postal code: ${postCode}`
  };

  try {
    await sgMail.send(msg);

    res.json({ success: true });
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }

    res.json({ success: false });
  }
};
