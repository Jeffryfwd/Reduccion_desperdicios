

async function PostCategoria(Categoria) {
    const token = localStorage.getItem('access-token');
    const tokenBearer = 'Bearer ' + token;
    try {
        const CategoriaData={
            Categoria
        }
       const response = await fetch("http://127.0.0.1:8000/api/categoria/", {
            method: 'POST',
            headers: {
                'Authorization': tokenBearer,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(CategoriaData)
        });
    
        if (!response.ok) {
            throw new Error('Error fetching Categoria');
        }
    
        return await response.json();
       
    } catch (error) {
        console.error('Error fetching Category:', error);
        throw error;
    }
}

export default PostCategoria