async function  GetVenta() {
    try {
    
        const response = await fetch("http://127.0.0.1:8000/api/rventa/", {
            method: 'GET',
            headers: {
                
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

export default GetVenta