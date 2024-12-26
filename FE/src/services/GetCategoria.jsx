    async function  GetCategoria() {
    try {
        const token = localStorage.getItem('access-token');
        const tokenBearer = 'Bearer ' + token
        const response = await fetch("http://127.0.0.1:8000/api/categoria/", {
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


export default GetCategoria