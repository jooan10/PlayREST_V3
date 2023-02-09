const express = require('express');

let Juego = require(__dirname + '/../models/juego.js');
let router = express.Router();

const multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname)
    }
})

let upload = multer({storage: storage});


router.get('/', (req, res) => {
    res.redirect('admin/juegos');
})


// GET /juegos
router.get('/juegos', (req, res) => {
    Juego.find().then(resultado => {
    res.render('admin_juegos', {juegos: resultado});
    }).catch(error => {
    });
});


// GET /juegos/nuevo 
router.get('/juegos/nuevo', (req, res) => {
    res.render('admin_juegos_form');
})


router.get('/juegos/editar/:id',(req,res)=>{
    Juego.findById(req.params['id']).then(resultado=>{
        if(resultado){
            res.render('admin_juegos_form', {juego:resultado});
        }else{
            res.render('admin_error', {error: "Juego no encontrado"});
        }
    }).catch(error=>{
        res.render('admin_error',{error: "Juego no encontrado"});
    });
});


// Servicio para modificar Juegos
router.put('/juegos/:id', (req, res) => {
    Juego.findByIdAndUpdate(req.params.id, {
        $set: {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            edad: req.body.edad,
            jugadores: req.body.jugadores,
            tipo: req.body.tipo,
            precio: req.body.precio,
            //imagen:req.file.filename
        }
    }, {new: true}).then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('admin_error', {error: "Error modificando juego"});
    });
});


// Servicio para insertar Juegos
router.post('/juegos', upload.single('imagen'), (req, res) => {
    let nuevoJuego = new Juego({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    edad: req.body.edad,
    jugadores: req.body.jugadores,
    tipo: req.body.tipo,
    precio: req.body.precio,
    imagen:req.file.filename
    //imagen:req.body.imagen
    });
    nuevoJuego.save().then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('admin_error',{error: "Error añadiendo Juego"});
    });
});



// DELETE /juegos/:id
router.delete('/juegos/:id', (req, res) => {
    Juego.findByIdAndRemove(req.params.id).then(resultado => {
    res.redirect(req.baseUrl);
    }).catch(error => {
    res.render('error', {error: "Error borrando Juego"});
    });
});


module.exports = router;