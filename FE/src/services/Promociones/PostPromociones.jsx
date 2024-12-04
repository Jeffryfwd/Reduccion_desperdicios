async function Postpromociones(id_producto, Fecha_inicio, Fecha_fin, Descuento, Precio_total, url_imagen ) {
    const token = localStorage.getItem('access-token');
    const tokenBearer = 'Bearer ' + token;
    try {
        const userData = { 
             id_producto,
             Fecha_inicio,
             Fecha_fin, 
             Descuento,
             Precio_total,
             url_imagen
            
        };
        
        const response = await fetch("http://127.0.0.1:8000/api/promociones/", {
            method: 'POST',
            headers: {
                'Authorization': tokenBearer,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server responded with an error:', errorData);
            throw new Error(`Error ${response.status}: ${JSON.stringify(errorData)}`);
        }

        return await response.json();

    } catch (error) {
        console.error('Error posting user:', error.message);
        throw error;
    }
}

export default Postpromociones