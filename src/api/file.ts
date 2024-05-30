import axios from "axios";

export async function fileUpload(formData) {
    return await axios.post(
        `http://localhost:8000/file/upload`, 
        formData,
        {
            headers: {
                "content-type": "multipart/form-data",
              },
        }
    ).then(res=>res.data)
}