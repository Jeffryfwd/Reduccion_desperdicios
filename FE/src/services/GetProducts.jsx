import React from 'react'

async function  GetProducts() {
    try {
        const token = localStorage.getItem('access-token');
        const tokenBearer = 'Bearer ' + token
        const response = await fetch("http://127.0.0.1:8000/api/productos/", {
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
async function DeleteProducts(id) {
    const token = localStorage.getItem('access-token');
    const tokenBearer = 'Bearer ' + token
    try {
        // Asegúrate de que la URL incluya el id de la tarea que quieres eliminar
        const response = await fetch(`http://127.0.0.1:8000/api/productos/${id}`, {
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

//-------------------------------------------------------------------------------------//
async function PutProduct(id, Nombre_producto, Fecha_vencimiento, Cantidad, Precio, Estado,Categoria) {
    
    const token = localStorage.getItem('access-token');
    const tokenBearer = 'Bearer ' + token;
    try {

        const userData={
            Nombre_producto, 
            Fecha_vencimiento,
             Cantidad,
              Precio, 
              Estado,
              Categoria: { id: Categoria.id }
        }
        // Asegúrate de que la URL incluya el id de la tarea que quieres eliminar
        const response = await fetch(`http://127.0.0.1:8000/api/productos/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': tokenBearer,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return await response.json();

        
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }

 
}

async function Postproducts(Nombre_producto, Fecha_vencimiento,Cantidad,Estado,Precio,Categoria) {
    const token = localStorage.getItem('access-token');
    const tokenBearer = 'Bearer ' + token;
    try {
        const userData = { 
             Nombre_producto,
             Fecha_vencimiento,
             Cantidad,
             Estado,
             Precio,
             Categoria//: { Categoria: Categoria.Categoria }
            
        };
        console.log(userData.Categoria);
        const response = await fetch("http://127.0.0.1:8000/api/productos/", {
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




export {GetProducts,DeleteProducts, PutProduct, Postproducts}