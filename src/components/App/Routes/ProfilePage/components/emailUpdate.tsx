// import nodemailer from 'nodemailer';

// const sendEmailNotification = (email: string, nouveauEmail: string) => {
//     // Configurez les paramètres de notification par email
//     const transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 587,
//         secure: false, // ou true si vous utilisez SSL
//         auth: {
//             user: 'votre-adresse-email@gmail.com',
//             pass: 'votre-mot-de-passe',
//         },
//     });

//     // Définissez l'objet et le contenu du mail
//     const mailOptions = {
//         from: 'ciné-delices@gmail.com',
//         to: email,
//         subject: 'Modification de votre adresse mail',
//         text: `Bonjour, votre adresse mail a été modifiée en ${nouveauEmail}.`,
//     };

//     // Envoyez le mail
//     transporter.sendMail(mailOptions, (error) => {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Mail envoyé avec succès');
//         }
//     });
// };

// export default sendEmailNotification;
