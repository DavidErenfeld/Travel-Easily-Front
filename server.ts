import express from "express";
import path from "path";

const app = express();
const PORT = 80; // שימוש בפורט 80

// הגדרת תיקיית ה'assets' כתיקייה סטטית
app.use(express.static(path.join(__dirname, "dist")));

// נתיב כללי שמחזיר את הדף הראשי לכל בקשת GET
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// האזנה לפורט 80
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
