async function  GetInfoCompras() {
    try {
        const token = localStorage.getItem('access-token');
        const id = localStorage.getItem('Id_user');

        if (!id) {
            throw new Error('ID del usuario no se encontro')
        }
        const tokenBearer = 'Bearer ' + token
        const response = await fetch(`http://127.0.0.1:8000/api/ventas/cliente/${id}/`, {
            method: 'GET',
            headers: {
                'Authorization': tokenBearer,
                'Content-Type': 'application/json'
            }
        });
    
        if (!response.ok) {
            throw new Error('Error fetching users');
        }
    
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}


export default GetInfoCompras