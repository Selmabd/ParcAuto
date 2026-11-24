import express from "express";

const router = express.Router();

let vehicules = [
  { id: 1, marque: "Dacia", modele: "Logan", immatriculation: "12345-A-6", disponible: true },
  { id: 2, marque: "Renault", modele: "Clio", immatriculation: "67890-B-6", disponible: false },
  { id: 3, marque: "Peugeot", modele: "208", immatriculation: "24680-D-1", disponible: true }
];

let prochainId = 4;

router.get("/", (req, res) => {
  if (req.query.disponible === "true") {
    return res.status(200).json(vehicules.filter((v) => v.disponible));
  }
  res.status(200).json(vehicules);
});


router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const vehicule = vehicules.find((v) => v.id === id);

  if (!vehicule) {
    return res.status(404).json({ erreur: "Véhicule introuvable" });
  }
  res.status(200).json(vehicule);
});


router.post("/", (req, res) => {
  const { marque, modele, immatriculation } = req.body;

  if (!marque || !modele || !immatriculation) {
    return res.status(400).json({ erreur: "Champs obligatoires manquants" });
  }

  const nouveau = {
    id: prochainId++,
    marque,
    modele,
    immatriculation,
    disponible: true
  };

  vehicules.push(nouveau);
  res.status(201).json(nouveau);
});


router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const vehicule = vehicules.find((v) => v.id === id);

  if (!vehicule) {
    return res.status(404).json({ erreur: "Véhicule introuvable" });
  }

  const { marque, modele, immatriculation, disponible } = req.body;

  if (marque !== undefined) vehicule.marque = marque;
  if (modele !== undefined) vehicule.modele = modele;
  if (immatriculation !== undefined) vehicule.immatriculation = immatriculation;
  if (disponible !== undefined) vehicule.disponible = disponible;

  res.status(200).json(vehicule);
});


router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = vehicules.findIndex((v) => v.id === id);

  if (index === -1) {
    return res.status(404).json({ erreur: "Véhicule introuvable" });
  }

  vehicules.splice(index, 1);
  res.status(204).send();
});

export default router;