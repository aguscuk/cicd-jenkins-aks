const express = require("express");
const app = express();

app.listen(4444, function () {
  console.log("listening on 4444");
});

app.get("/", (req, res) => {
  res.send("DEV - api lihat daftar user");
});

app.get("/delete", (req, res) => {
  res.send("DEV - api hapus User");
});

app.get("/update", (req, res) => {
  res.send("DEV - api ubah User");
});

app.get("/insert", (req, res) => {
  res.send("DEV - api tambah User");
});
