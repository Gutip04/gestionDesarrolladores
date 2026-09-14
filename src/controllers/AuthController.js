import { loginService } from '../services/AuthService.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const resultado = await loginService(email, password);
    res.json(resultado);
  } catch (error) {
    const statusCode = error.message === 'Credenciales inválidas' ? 401 : 500;
    res.status(statusCode).json({ mensaje: error.message });
  }
};