import jwt from 'jsonwebtoken';

// Middleware 1: Autenticación (verifica que la persona haya iniciado sesión)
export const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado: Token no proporcionado' });
  }

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET || 'secreto_super_seguro_jwt');
    req.usuario = verificado;
    next();
  } catch (error) {
    console.log(error);
    
    return res.status(403).json({ mensaje: 'Token inválido o expirado' });
  }
};

// Middleware 2: Autorización (verifica que sea admin, id_rol = 1)
export const esAdmin = (req, res, next) => {
  if (req.usuario && req.usuario.id_rol === 1) {
    next();
  } else {
    return res.status(403).json({ 
      mensaje: 'Acceso denegado: Solo el Administrador puede realizar esta acción' 
    });
  }
};