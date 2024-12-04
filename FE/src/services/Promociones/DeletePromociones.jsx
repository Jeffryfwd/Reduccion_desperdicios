async function DeletePromociones(id) {
    const token = localStorage.getItem('access-token');
    const tokenBearer = 'Bearer ' + token
    try {
        // Asegúrate de que la URL incluya el id de la tarea que quieres eliminar
        const response = await fetch(`http://127.0.0.1:8000/api/promociones/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': tokenBearer,
                'Content-Type': 'application/json'
            }
        });

        // Verifica si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error(`Error deleting task with id ${id}`);
        }

        // Retorna un mensaje de éxito
        return { message: `Task with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }

 
}
export default DeletePromociones