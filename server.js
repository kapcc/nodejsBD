// Подключаем Express
const express = require('express');
const path = require('path');
// Создаем приложение Express
const app = express();
const bodyParser = require("body-parser");

// Устанавливаем порт для сервера
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose")
const db = "mongodb+srv://kapcc002:Revan2000@cluster0.dicz3.mongodb.net/db_bb?retryWrites=true&w=majority&appName=Cluster0"
mongoose
.connect(db)
.then((res) => console.log("Connected to DB"))
.catch((error) => console.log(error))
// Настроим сервер на отдачу статичных файлов из директории "public"

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));


const divSchema = new mongoose.Schema({
  text: { type: String, required: true },
});
const Div = mongoose.model("Div", divSchema);

// Роут для отображения главной страницы с дивами
app.get("/", async (req, res) => {
  try {
    const divs = await Div.find(); // Загружаем дивы из базы данных
    res.render("index", { divs }); // Передаем их в шаблон
  } catch (error) {
    console.log(error);
    res.status(500).send("Error loading data.");
  }
});

// Роут для обработки формы и создания нового дива
app.post("/create", async (req, res) => {
  const { text } = req.body;
  try {
    await Div.create({ text }); // Добавляем новый див в базу данных
    res.redirect("/"); // Возвращаемся на главную страницу
  } catch (error) {
    console.log(error);
    res.status(500).send("Error saving data.");
  }
});











// Запускаем сервер
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

});


