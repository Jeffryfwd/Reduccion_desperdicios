import React from 'react'
import { UploadFile } from '../Firebase/config'

function File() {
  return (
    <div>
        <input type="file" onChange={e => UploadFile(e.target.files[0])}/>
    </div>
  )
}

export default File