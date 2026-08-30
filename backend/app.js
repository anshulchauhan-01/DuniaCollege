import express from 'express';
import cors from 'cors';
import db from "./database.js";

const app = express();
app.use(express.json());
app.use(cors());

db.run(`
    CREATE TABLE IF NOT EXISTS colleges (
        id INTEGER PRIMARY KEY,
        name TEXT,
        city TEXT,
        state TEXT,
        rating REAL,
        average_salary INTEGER,
        highest_salary INTEGER,
        placement_percentage INTEGER,
        overview TEXT,
        cover TEXT
    )
`);

app.get("/institutions", async (req, res) => {
    try {
        const response = await fetch(
            `https://collegedunia.com/web-api/nc/e-search/autocomplete?term=${req.query.term}`, {
                headers:
                {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36'
                }
            })

        const data = await response.json();

        res.json(data);
    } catch (e) {
        console.log(e);
        res.status(500);
    }
});



app.get("/colleges", (req, res) => {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const query = `
        SELECT * FROM colleges
        WHERE name LIKE ?
        LIMIT ? OFFSET ?`;

    db.all(
        query,
        [`%${search}%`, limit, offset],
        (e, rows) => {
            if (e) {
                console.log(e);
                return res.status(500).json({
                    error: "Database Error"
                });
            }

            res.json(rows);
        }
    );
});

app.get("/colleges/:id", (req, res) => {
    const query = `
        SELECT * FROM colleges
        WHERE id = ?`;

    db.get(query, [req.params.id], (e, row) => {
        if (e) {
            console.log(e);
            return res.status(500).json({ error: "Database error" });
        }

        if (!row) {
            return res.status(404).json({ error: "College not found" });
        }

        res.json(row);
    });
});

app.get("/import", async (req, res) => {
    const term = req.query.term || "";

    try {
        const response = await fetch(
            `https://collegedunia.com/web-api/nc/e-search/autocomplete?term=${encodeURIComponent(term)}`,
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36'
                }
            }
        );

        const data = await response.json();

        data.college.forEach((college) => {
            db.run(
                `INSERT OR REPLACE INTO colleges
                (
                    id,
                    name,
                    city,
                    state,
                    rating,
                    average_salary,
                    highest_salary,
                    placement_percentage,
                    overview,
                    cover
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    college.college_id,
                    college.college_name || null,
                    college.college_city || null,
                    college.state || null,
                    college.rating || null,
                    college.placement?.average_salary || null,
                    college.placement?.highest_salary || null,
                    college.placement_percentage || null,
                    null,
                    college.cover || null
                ]
            );
        });

        res.json({
            message: "Data imported successfully",
            count: data.college.length
        });

    } catch (e) {
        console.log(e);
        res.status(500).json("Import failed");
    }
});


app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port " + (process.env.PORT || 3000));
});