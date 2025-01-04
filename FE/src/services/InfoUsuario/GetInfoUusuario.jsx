// Primera consulta para obtener el usuario completo
export async function GetInfoUsuario() {
    try {
        const token = localStorage.getItem('access-token');
        const id = localStorage.getItem('Id_user');
        if (!id) {
            throw new Error('ID de usuario no encontrado en el localStorage');
        }

        const response = await fetch(`http://127.0.0.1:8000/api/registro/user/${id}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error en la consulta principal');
        }

        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Error en GetInfoUsuario:', error);
        throw error; // Propagar el error para intentar el fallback
    }
}

// Segunda consulta para obtener información básica si falla la primera
export async function GetUserInfo() {
    try {
        const token = localStorage.getItem('access-token');
        const id = localStorage.getItem('Id_user');
        if (!id) {
            throw new Error('ID de usuario no encontrado en el localStorage');
        }

        const response = await fetch(`http://127.0.0.1:8000/api/usuario/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error en la consulta alternativa');
        }

        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Error en GetUserInfo:', error);
        throw error; // Manejar error en el frontend
    }
}

