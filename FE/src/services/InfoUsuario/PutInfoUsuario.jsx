async function PutInfoUsuario(id, first_name, email, Direccion_envio, Numero_telefono, Foto_perfil) {
    // Obtener el token almacenado en localStorage
    const token = localStorage.getItem('access-token');
    const tokenBearer = 'Bearer ' + token;

    try {
        // Datos a enviar al servidor
        const userData = {
            first_name: firstName.trim(),
            email: email.trim(),
            Direccion_envio: Direccion_envio.trim(),
            Numero_telefono: Numero_telefono.trim()
        };
        

        // Realizar la solicitud al endpoint del backend
        const response = await fetch('http://127.0.0.1:8000/api/editar/usuario/', {
            method: 'POST', // Usamos POST porque así se definió la vista en Django
            headers: {
                'Authorization': tokenBearer,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        // Convertir la respuesta a JSON
        const result = await response.json();

        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error(result.error || 'Error al actualizar el usuario.');
        }

        return result; // Retorna los datos de la respuesta

    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        throw error; // Relanza el error para ser manejado en el frontend
    }
}

export default PutInfoUsuario;
