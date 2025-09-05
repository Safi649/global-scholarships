// 📁 pages/api/contact.js
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await addDoc(collection(db, "messages"), {
      name,
      email,
      subject,
      message,
      createdAt: serverTimestamp(),
    });

    return res.status(200).json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("Error saving message:", err);
    return res.status(500).json({ message: "Failed to send message" });
  }
}
