const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
const db = new sqlite3.Database('./sales.db');

app.get('/api/sales-data', (req, res) => {
  const query = `
    SELECT 
      strftime('%Y-%m', SalesDate) AS month,
      SUM(SalesAmount) AS total_sales
    FROM Sales
    GROUP BY month
    ORDER BY month;
  `;
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
