import express from "express";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const __dirname = path.resolve();
let CONTACTS = [
  { id: uuidv4(), name: "Vladilen", value: 76575675786977, marked: false },
];
const app = express();

app.use(express.json());

// GET
app.get("/api/contacts", (req, res) => {
  res.status(200).json(CONTACTS);
});

// POST
app.post("/api/contacts", (req, res) => {
  const contact = { ...req.body, id: uuidv4(), marked: false };
  CONTACTS.push(contact);
  res.status(201).json(contact);
});

// DELETE
app.delete("/api/contacts/:id", (req, res) => {
  CONTACTS = CONTACTS.filter((c) => c.id !== req.params.id);
  res.status(200).json({ message: "Contact deleted" });
});

// PUT
app.put("/api/contacts/:id", (req, res) => {
  const idx = CONTACTS.findIndex((c) => c.id === req.params.id);
  CONTACTS[idx] = req.body;
  res.json(CONTACTS[idx]);
});

app.use(express.static(path.resolve(__dirname, "client")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "index.html"));
});

app.listen(3000, () => {
  console.log("Server has been started on port 3000...");
});
