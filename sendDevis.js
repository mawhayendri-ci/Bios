const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const data = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: data.email,
      to: process.env.EMAIL_USER,
      subject: "Nouvelle demande de devis - BIOS SERVICES",
      text: `
Entreprise: ${data.entreprise}
Secteur: ${data.secteur}
Nom: ${data.nom}
Fonction: ${data.fonction}
Email: ${data.email}
Téléphone: ${data.telephone}
Type projet: ${data.typeProjet}
Budget: ${data.budget}
Délai: ${data.delai}
Description: ${data.description}
Site existant: ${data.existingSite}
URL: ${data.siteweb}
Références: ${data.competitors}
Charte: ${data.charte}
Commentaires: ${data.commentaires}
      `,
    });

    return res.status(200).json({ message: "Email envoyé avec succès" });

  } catch (error) {
    return res.status(500).json({ message: "Erreur envoi email" });
  }
};