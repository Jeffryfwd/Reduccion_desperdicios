async function GetUsuarios(username, password) {
    try {
        const userData = { 
            username: username,
            password: password
        };

        console.log(userData)

        const response = await fetch("http://127.0.0.1:8000/api/api/token/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        console.log(response)

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server responded with an error:', errorData);
            throw new Error(`Error ${response.status}: ${JSON.stringify(errorData)}`);
        }

        const respuesta = await response.json();
        console.log(respuesta)
        localStorage.setItem('access-token', respuesta.access)
        localStorage.setItem('Token-refresh',respuesta.refresh);
        return respuesta;
        

    } catch (error) {
        console.error('Error posting user:', error.message);
        throw error;
    }
}



export default GetUsuarios;

