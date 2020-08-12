/*
 * Route/path: '/api/usuarios'
 */
const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Controller.
// Note: No include parenthesis as part as function !!!!
router.get('/', validarJWT, getUsuarios);

router.post('/',
    [
        check('nombre', 'Nombre required.').not().isEmpty(),
        check('password', 'Password, required.').not().isEmpty(),
        check('email', 'Emial required.').isEmail(),

        // Placed after Checks.
        validarCampos
    ],
    crearUsuario
);

router.put('/:id',
    [
        validarJWT,
        check('nombre', 'Nombre required.').not().isEmpty(),
        check('email', 'Emial required.').isEmail(),
        check('role', 'Role required.').not().isEmpty(),

        // Placed after Checks.
        validarCampos
    ],
    actualizarUsuario
);

router.delete('/:id',
    validarJWT,
    borrarUsuario
);

module.exports = router; 