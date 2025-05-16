const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");

dotenv.config();

app.use(
  cors({
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ fruits: ["apple", "orange1", "banana"] });
});

app.listen(8080, () => {
  console.log("Server on 8080");
});

const db = new sqlite3.Database("./users.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the SQLite database.");
    db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT,
            email TEXT UNIQUE
        )`);
  }
});

app.post("/api/auth/register", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(
      `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`,
      [username, hashedPassword, email],
      function (err) {
        if (err) {
          return res.status(400).send("User already exists");
        }
        res.status(201).send("User registered");
      }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  db.get(
    `SELECT * FROM users WHERE username = ?`,
    [username],
    async (err, user) => {
      if (!user) return res.status(400).send("Пользователь не найден");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).send("Неверные данные");

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      res.json({ token, id: user.id });
    }
  );
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Токен отсутствует" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Недопустимый токен" });
    }
    req.user = user;
    next();
  });
}

app.get("/api/auth/me", authenticateToken, (req, res) => {
  const userId = req.user.id;
  db.get(
    `SELECT username, id FROM users WHERE id = ?`,
    [userId],
    (err, user) => {
      if (err || !user)
        return res.status(404).json({ message: "Пользователь не найден" });
      res.json(user);
    }
  );
});

app.post("/api/book/apartment", async (req, res) => {
  const { user_id, apt_id } = req.body;
  try {
    db.run(
      `INSERT INTO bookings (user_id, apartment_id) VALUES (?, ?)`,
      [user_id, apt_id],
      function (err) {
        if (err) {
          console.log(err);
          return res.status(400).send("User already exists");
        }
        res.status(201).send("User registered");
      }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/api/book/apartments/:id", (req, res) => {
  const userId = req.params.id;
  db.all(
    `SELECT a.*
     FROM apartments a
     JOIN bookings b ON a.apartment_id = b.apartment_id
     WHERE b.user_id = ?`,
    [userId],
    (err, apartments) => {
      if (err) {
        return res.status(500).send("Internal server error");
      }
      if (!apartments.length) {
        return res.status(404).send("No apartments found for this user");
      }
      res.json(apartments);
    }
  );
});

app.get("/api/houses", (req, res) => {
  db.all("SELECT * FROM houses", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get("/api/houses/:id", (req, res) => {
  const id = req.params.id;
  const query = `
      SELECT houses.house_id AS houseId, houses.address AS houseAdress, houses.description AS description, houses.description_image AS image,
             apartments.apartment_id AS aptId, apartments.number AS aptNumber, apartments.type AS aptType, apartments.thumbnail AS aptImage, apartments.price AS aptPrice, apartments.area AS aptArea
      FROM houses
      LEFT JOIN apartments ON houses.house_id = apartments.house_id
      WHERE houses.house_id = ?`;

  db.all(query, [id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    const item = {
      id: rows[0]?.houseId,
      address: rows[0]?.houseAdress,
      description: rows[0]?.description,
      image: rows[0]?.image,
      apartments: rows
        .map((row) => ({
          id: row.aptId,
          number: row.aptNumber,
          type: row.aptType,
          thumbnail: row.aptImage,
          area: row.aptArea,
          price: row.aptPrice,
        }))
        .filter((item) => item.id !== null),
    };

    res.json(item);
  });
});

app.get("/api/apartments/:id", (req, res) => {
  const id = req.params.id;
  db.get(
    "SELECT a.*, h.address AS house_name FROM apartments a LEFT JOIN houses h ON a.house_id = h.house_id WHERE a.apartment_id = ?",
    [id],
    (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(row);
    }
  );
});
