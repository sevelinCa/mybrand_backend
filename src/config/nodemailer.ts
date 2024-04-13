import nodemailer from "nodemailer"

const transporter  = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        user: "ngabosevelin@gmail.com",
        pass: "zpfx qisa azei pnki"
    },
    tls: {
            
        rejectUnauthorized: false
    }

})
export default transporter