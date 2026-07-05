import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Safe lazy initialization for Gemini API
  let ai: GoogleGenAI | null = null;
  function getGeminiClient() {
    if (!ai) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not configured in environment variables.");
      }
      ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return ai;
  }

  // API Endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // AI Music Tutor endpoint
  app.post("/api/tutor", async (req, res) => {
    try {
      const { prompt, history } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required." });
      }

      const client = getGeminiClient();

      // Formulate contents with history if available
      let contents: any[] = [];
      if (history && Array.isArray(history)) {
        contents = history.map((h: any) => ({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.content }],
        }));
      }
      
      // Append the latest user prompt
      contents.push({
        role: "user",
        parts: [{ text: prompt }],
      });

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: `You are Guru "Swarohana AI", an expert Carnatic Music teacher and mentor at Swarohana Music Studio. Your purpose is to guide and teach students about Carnatic music, its history, basic concepts (Sruthi, Swaras, Thalam, Ragas), and the specific Swarohana Music Studio curriculum.
          
          Guidelines for your persona:
          1. Be warm, humble, encouraging, and deeply respectful of the musical art form. Keep your tone supportive like a traditional South Indian classical Guru.
          2. You are highly knowledgeable in:
             - Shruthi (the drone/tonic pitch)
             - Swaras: Shadjam (Sa), Rishabham (Ri), Gandharam (Ga), Madhyamam (Ma), Panchamam (Pa), Dhaivatam (Dha), Nishadam (Ni).
             - Swarohana Curriculum (Level 1 Basic, Level 2 Intermediate, Level 3 Advance).
             - Exercises: Sarali Varisai (14 exercises), Jandai Varisai (9), Alankaram, Geetham, Swarajathi, Varnam, and Thillana.
             - Voice Culture, ear training, and identifying musical instruments.
          3. If students ask for notation, explain clearly. For example, Sarali Varisai 1: "S R G M P D N S' | S' N D P M G R S" in Adi Thalam.
          4. Encourage Tamil-speaking students by offering assistance in Tamil when appropriate, or using bilingual terms (e.g., ஸ்வரம், ராகம், தாளம்).
          5. Avoid talking about non-music topics. If someone asks unrelated questions, gently bring them back to Carnatic music and Swarohana.
          6. Keep your responses structured, clear, and highly musical. Use bullet points or code blocks for swara notations to make them readable.`,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "I apologize, I couldn't generate a response. Please try again.";
      res.json({ text: replyText });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({
        error: error.message || "An error occurred while connecting to the AI Tutor.",
      });
    }
  });

  // --- PERSISTENT GALLERY SYSTEM ---
  const uploadsDir = path.join(process.cwd(), "uploads");
  const galleryJsonPath = path.join(uploadsDir, "gallery.json");

  // Ensure uploads directory and registry file exist
  if (!fs.existsSync(uploadsDir)) {
    try {
      fs.mkdirSync(uploadsDir, { recursive: true });
    } catch (e) {
      console.error("Error creating uploads directory:", e);
    }
  }
  if (!fs.existsSync(galleryJsonPath)) {
    try {
      fs.writeFileSync(galleryJsonPath, JSON.stringify([]), "utf-8");
    } catch (e) {
      console.error("Error creating gallery.json:", e);
    }
  }

  // Serve uploads folder statically
  app.use("/uploads", express.static(uploadsDir));

  // GET custom gallery items
  app.get("/api/gallery/items", (req, res) => {
    try {
      if (fs.existsSync(galleryJsonPath)) {
        const data = fs.readFileSync(galleryJsonPath, "utf-8");
        const items = JSON.parse(data);
        return res.json(items);
      }
      return res.json([]);
    } catch (err: any) {
      console.error("Error reading gallery JSON:", err);
      res.status(500).json({ error: "Failed to read gallery items" });
    }
  });

  // POST upload multiple images
  app.post("/api/gallery/upload-multiple", (req, res) => {
    try {
      const { images } = req.body;
      if (!images || !Array.isArray(images)) {
        return res.status(400).json({ error: "No images provided" });
      }

      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      if (!fs.existsSync(galleryJsonPath)) {
        fs.writeFileSync(galleryJsonPath, JSON.stringify([]), "utf-8");
      }

      const currentData = fs.readFileSync(galleryJsonPath, "utf-8");
      const customItems = JSON.parse(currentData);

      const newlyAddedItems = [];

      for (const img of images) {
        const { base64Data, url, titleEn, titleTa, category, descEn, descTa } = img;
        if (!base64Data && !url) continue;

        if (url) {
          const id = `custom_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
          const newItem = {
            id,
            url,
            titleEn: titleEn || "External Image Link",
            titleTa: titleTa || "வெளிப்புற படம்",
            category: category || "classes",
            descEn: descEn || "Linked external image added to gallery.",
            descTa: descTa || "இணைக்கப்பட்ட வெளிப்புற படம்."
          };
          customItems.unshift(newItem);
          newlyAddedItems.push(newItem);
          continue;
        }

        // Extract raw base64 data and file type
        const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
          continue;
        }

        const mimeType = matches[1];
        const buffer = Buffer.from(matches[2], "base64");

        // Generate clean safe filename
        const ext = mimeType.split("/")[1] || "png";
        const id = `custom_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        const fileName = `${id}.${ext}`;
        const filePath = path.join(uploadsDir, fileName);

        // Write file to disk
        fs.writeFileSync(filePath, buffer);

        const newItem = {
          id,
          url: `/uploads/${fileName}`,
          titleEn: titleEn || "Uploaded Image",
          titleTa: titleTa || "பதிவேற்றப்பட்ட படம்",
          category: category || "classes",
          descEn: descEn || "User uploaded image.",
          descTa: descTa || "பதிவேற்றப்பட்ட படம்."
        };

        customItems.unshift(newItem); // prepend new items
        newlyAddedItems.push(newItem);
      }

      // Save back to JSON file
      fs.writeFileSync(galleryJsonPath, JSON.stringify(customItems, null, 2), "utf-8");

      res.json({ success: true, added: newlyAddedItems, totalCount: customItems.length });
    } catch (err: any) {
      console.error("Error writing gallery files:", err);
      res.status(500).json({ error: "Failed to save uploaded images" });
    }
  });

  // POST upload single image
  app.post("/api/gallery/upload-single", (req, res) => {
    try {
      const { image } = req.body;
      if (!image) {
        return res.status(400).json({ error: "No image provided" });
      }

      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      if (!fs.existsSync(galleryJsonPath)) {
        fs.writeFileSync(galleryJsonPath, JSON.stringify([]), "utf-8");
      }

      const currentData = fs.readFileSync(galleryJsonPath, "utf-8");
      const customItems = JSON.parse(currentData);

      const { base64Data, url, titleEn, titleTa, category, descEn, descTa } = image;
      if (!base64Data && !url) {
        return res.status(400).json({ error: "No image data or link provided" });
      }

      let newItem;
      if (url) {
        const id = `custom_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        newItem = {
          id,
          url,
          titleEn: titleEn || "External Image Link",
          titleTa: titleTa || "வெளிப்புற படம்",
          category: category || "classes",
          descEn: descEn || "Linked external image added to gallery.",
          descTa: descTa || "இணைக்கப்பட்ட வெளிப்புற படம்."
        };
      } else {
        // Extract raw base64 data and file type
        const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
          return res.status(400).json({ error: "Invalid image data format" });
        }

        const mimeType = matches[1];
        const buffer = Buffer.from(matches[2], "base64");

        // Generate clean safe filename
        const ext = mimeType.split("/")[1] || "png";
        const id = `custom_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        const fileName = `${id}.${ext}`;
        const filePath = path.join(uploadsDir, fileName);

        // Write file to disk
        fs.writeFileSync(filePath, buffer);

        newItem = {
          id,
          url: `/uploads/${fileName}`,
          titleEn: titleEn || "Uploaded Image",
          titleTa: titleTa || "பதிவேற்றப்பட்ட படம்",
          category: category || "classes",
          descEn: descEn || "User uploaded image.",
          descTa: descTa || "பதிவேற்றப்பட்ட படம்."
        };
      }

      customItems.unshift(newItem); // prepend new item
      fs.writeFileSync(galleryJsonPath, JSON.stringify(customItems, null, 2), "utf-8");

      res.json({ success: true, item: newItem, totalCount: customItems.length });
    } catch (err: any) {
      console.error("Error writing gallery file:", err);
      res.status(500).json({ error: "Failed to save uploaded image" });
    }
  });

  // DELETE single gallery item
  app.delete("/api/gallery/item/:id", (req, res) => {
    try {
      const { id } = req.params;
      if (!fs.existsSync(galleryJsonPath)) {
        return res.status(404).json({ error: "No custom images found" });
      }

      const currentData = fs.readFileSync(galleryJsonPath, "utf-8");
      let customItems = JSON.parse(currentData);

      const targetItem = customItems.find((item: any) => item.id === id);
      if (!targetItem) {
        return res.status(404).json({ error: "Item not found" });
      }

      // Remove file if exists
      const fileName = path.basename(targetItem.url);
      const filePath = path.join(uploadsDir, fileName);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.error("Failed to delete physical file:", e);
        }
      }

      // Filter registry
      customItems = customItems.filter((item: any) => item.id !== id);
      fs.writeFileSync(galleryJsonPath, JSON.stringify(customItems, null, 2), "utf-8");

      res.json({ success: true, message: "Deleted successfully" });
    } catch (err: any) {
      console.error("Error deleting image:", err);
      res.status(500).json({ error: "Failed to delete image" });
    }
  });

  // Serve static assets
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
