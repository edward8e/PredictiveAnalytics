//prod.js - production keys here

module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    sendGridKey: process.env.SEND_GRID_KEY,
    redirectDomain: process.env.REDIRECT_DOMAIN,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryKey: process.env.CLOUDINARY_KEY,
    cloudinarySecret: process.env.CLOUDINARY_SECRET,
    TwilioAccountSID: process.env.TWILIO_ACCOUNT_SID,
    TwilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
    TwilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER,
    phoneNumbers: process.env.PHONE_NUMBERS,
    emailUserName: process.env.EMAIL_USER_NAME,
    emailPassword: process.env.EMAIL_PASSWORD,
    businessID: process.env.BUSINESS_ID,
    businessEmail: process.env.BUSINESS_EMAIL
}