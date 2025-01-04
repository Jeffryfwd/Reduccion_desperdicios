import React from 'react'

async function PostInforUser(user, Direccion_envio, Foto_perfil, Numero_telefono) {
    try {
        const PostData={
            user,
            Direccion_envio,
            Foto_perfil,
            Numero_telefono
        }

    const response = await fetch("http://127.0.0.1:8000/api/regist/user/", {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(PostData)
    });
    if (!response.ok) {
        const errorData = await response.json();
        console.error('Server responded with an error:', errorData);
        throw new Error(`Error ${response.status}: ${JSON.stringify(errorData)}`);
    }
    return await response.json();
    } catch (error) {
        console.error('Error al realizar el post:', error.message);
        throw error;
    }
  
   
  
}

export default PostInforUser