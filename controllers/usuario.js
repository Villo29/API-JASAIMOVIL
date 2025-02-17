const Usuario = require("../model/usuario");
const jwt = require("jsonwebtoken")



const validLogin = async (req, res) => {
  try {
    let username = req.body.UsuarioCORREO;
    let password = req.body.UsuarioCONTRASENA;
    let datos = [];

    const user = await Usuario.findOne({ Correo: username }).exec();

    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    if (password === user.Contrasena) {
      jwt.sign({ user: user }, process.env.TOKEN_SECRET, (err, token) => {
        if (err) {
          return res.status(500).send({ message: "Error al generar el token" });
        }
        datos.push({ correo: user.Correo, token: token });
        return res.status(200).send({ datos });
      });
    } else {
      return res.status(400).send({ message: "Contraseña incorrecta" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Error en el servidor" });
  }
};



const getUsuario = async (req, res) => {
  jwt.verify(req.token, 'pdf', (error, authData) => {
    Usuario.find((err, usuario) => {
      if (err) {
        res.send(error);
      }
      res.json(usuario, authData);
    });
  });
};


// Crear un objeto con el formato indicado
const createUsuario = async (req, res) => {
  const usuario = new Usuario({
    Nombre: req.body.Nombre,
    Contrasena: req.body.Contrasena,
    Correo: req.body.Correo,
    Telefono: req.body.Telefono,
  });

  usuario.save(async (err, usuario) => {

    if (err) {
      res.send(err);
    }
    res.json(usuario);
  });
};

// actualizar un elemento a partir del _id
const updateUsuario = async (req, res) => {
  Usuario.findOneAndUpdate(
    { _id: req.params.usuarioID },
    {
      $set: {
        Nombre: req.body.Nombre,
        Contrasena: req.body.Contrasena,
        Correo: req.body.Correo,
      },
    },
    { new: true },
    (err, Usuario) => {
      if (err) {
        res.send(err);
      } else res.json(Usuario);
    }
  );
};

// borrar un elemento a través del _id
const deleteUsuario = async (req, res) => {
  Usuario.deleteOne({ _id: req.params.usuarioID })
    .then(() => res.json({ message: "Todo Deleted" }))
    .catch((err) => res.send(err));
};


module.exports = {
  getUsuario,
  validLogin,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
