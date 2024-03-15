"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import express_1 from "express";
import path_1 from "path";
var app = (0, express_1)();
var PORT = 80; // שימוש בפורט 80
// הגדרת תיקיית ה'assets' כתיקייה סטטית
app.use(express_1.static(path_1.join(__dirname, "dist")));
// נתיב כללי שמחזיר את הדף הראשי לכל בקשת GET
app.get("*", function (_req, res) {
  res.sendFile(path_1.join(__dirname, "dist", "index.html"));
});
// האזנה לפורט 80
app.listen(PORT, function () {
  console.log("Server is running on http://localhost:".concat(PORT));
});
