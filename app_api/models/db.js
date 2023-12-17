var mongoose = require("mongoose");
var dbURI = "mongodb://localhost:27017/mekanbul";
//mongodb+srv://yusufyuksek:xm1yusufyuksek@cluster0.prmcgw8.mongodb.net/
mongoose.connect(dbURI);
mongoose.connection.on("connected", () => {
  console.log(dbURI + " adresindeki db'ye bağlanildi...");
});

mongoose.connection.on("error", () => {
  console.log("veritabani baglanti hatasi...");
});

mongoose.connection.on("disconnected", () => {
  console.log("veritabani bağlantisi kesildi...");
});

kapat = function (mesaj, callback) {
  mongoose.connection.close(function () {
    console.log("Bağlanti hatasi...\n" + mesaj);
    callback();
  });

  process.on("SIGINT", function () {
    kapat("uygulama kapatildi...", () => {
      mongoose.connection.close();
      console.log("veritabani baglantisi sonlandi...");
      process.exit(0);
    });
  });
};

require("./venue.js");

