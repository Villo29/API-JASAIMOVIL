const router = require("express").Router();
const verifyToken = require("./jwt");

//para usuario
const {
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  validLogin,
} = require("./controllers/usuario");



// ruta get principal
router.get("/", async (req, res) => {
  res.send("Let's build a CRUD API!");
});


//rutas para coleccion usuario
router.get("/Usuarios", verifyToken, getUsuario);
router.post("/Usuarios", createUsuario);
router.put("/Usuarios/:usuarioID", updateUsuario);
router.delete("/Usuarios/:usuarioID", deleteUsuario);
router.post("/login", validLogin);

module.exports = router;
