async function PostUsuarios(first_name, last_name, username, email, password, is_staff) {
    try {
        const userData = { 
            first_name: first_name,
            last_name: last_name,
            username: username,
            email: email,
            password: password,
            is_staff: Boolean(is_staff) // Garantiza que sea un booleano
        };

        const response = await fetch("http://127.0.0.1:8000/api/usuario/", {
            method: 'POST',
            headers: {
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

export default PostUsuarios;

