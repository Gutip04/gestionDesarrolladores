import bcrypt from 'bcryptjs'; 
import { crearUsuario, obtenerUsuarioPorEmail } from "../models/UsuarioModel.js"


async function Admin(){
    try{
        const password = "123456789"
        const salt = await bcrypt.genSalt(10);
        const passwordHasheada = await bcrypt.hash(password, salt);
    
        const usuario = {
        nombre : "Jeronimo", 
        apellido : "Pelaez", 
        email : "Jero123@adminn.com", 
        password: passwordHasheada, 
        id_rol : 1
    
       } 
       const usuarioExistente = await obtenerUsuarioPorEmail(usuario.email)
       console.log(usuarioExistente);
       
    
        if(usuarioExistente) return console.log("Admin ya existente en la base de datos")
    
        await crearUsuario(usuario)

        console.log("Admin creado Correctamente");
        

    } catch{
        console.log("Error al crear Admin");
        
    }


}


Admin()