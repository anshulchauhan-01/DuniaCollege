import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./college.db", (e) => {
    if (e) {
        console.log(e.message);
    } else {
        console.log("Connected to SQLite database");
    }
});

export default db;