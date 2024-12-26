async function PutCategoria(id, Categoria) {
    
    const token = localStorage.getItem('access-token');
    const tokenBearer = 'Bearer ' + token;
    try {

        const CategoriaData={

              Categoria
        }
        // Asegúrate de que la URL incluya el id de la tarea que quieres eliminar
        const response = await fetch(`http://127.0.0.1:8000/api/categoria/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': tokenBearer,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(CategoriaData)
        });
        return await response.json();

        
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }

 
}

export default PutCategoria