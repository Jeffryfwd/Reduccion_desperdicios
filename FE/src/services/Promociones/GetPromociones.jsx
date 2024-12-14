async function  Getpromociones() {
    try {
      
       
        const response = await fetch("http://127.0.0.1:8000/api/promocionesget/", {
            method: 'GET',
            headers: {
                
                'Content-Type': 'application/json'
            }
        });
    
        if (!response.ok) {
            throw new Error('Error fetching users');
        }
    
        return await response.json();
        
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

export default Getpromociones