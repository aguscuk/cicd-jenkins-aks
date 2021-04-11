const express = require("express");
const app = express();

app.listen(4444, function () {
  console.log("listening on 4444");
});

app.get("/", (req, res) => {
  res.send("api lihat daftar user");
});

app.get("/delete", (req, res) => {
  res.send("api hapus User");
});

app.get("/update", (req, res) => {
  res.send("api ubah User");
});

app.get("/insert", (req, res) => {
  res.send("api tambah User");
});
