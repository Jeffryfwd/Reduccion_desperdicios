import React, { useState } from 'react'
import { UploadFile } from '../Firebase/config'

function File() {
  const [file, setFile]= useState("")

  const SubirImagen= async (e)=>{
    e.preventDefault();
    const result = await UploadFile(file)
    console.log(result);
    

  }
  return (
    <div>
      <form action="" onSubmit={SubirImagen}>
        <input type="file" onChange={e => setFile(e.target.files[0])}/>
        <button>Subir</button>
        </form>
    </div>
  )
}

export default File