import api from '../api/interceptor'

export async function fileUpload(formData) {
    return await api.post(
        `/file/upload`, 
        formData,
        {
            headers: {
                "content-type": "multipart/form-data",
              },
        }
    ).then(res=>res.data)
}