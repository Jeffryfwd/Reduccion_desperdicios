async function PutPromociones(id,id_producto, url_imagen, Descuento, Fecha_inicio, Fecha_fin, Precio_total ) {
    
    const token = localStorage.getItem('access-token');
    const tokenBearer = 'Bearer ' + token;
    try {

        const PromocionData={
            id_producto,
            url_imagen,
            Descuento, 
            Fecha_inicio,
            Fecha_fin,
            Precio_total 
        }
        // Asegúrate de que la URL incluya el id de la tarea que quieres eliminar
        const response = await fetch(`http://127.0.0.1:8000/api/promociones/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': tokenBearer,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(PromocionData)
        });
        return await response.json();

        
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }

 
}

export default PutPromociones