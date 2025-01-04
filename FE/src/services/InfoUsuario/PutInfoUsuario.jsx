async function PutInfoUsuario(id, userData) {
    const token = localStorage.getItem('access-token');
    const tokenBearer = 'Bearer ' + token;
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/editar-usuario/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': tokenBearer,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData) // Enviamos el objeto userData con los datos correctos
        });

        if (!response.ok) {
            throw new Error('No se pudo actualizar el usuario');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        throw error;
    }
}
export default PutInfoUsuario