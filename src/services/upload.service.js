
export const uploadImg = async (ev) => {
  const CLOUD_NAME = 'dk9b84f0u' 
  const UPLOAD_PRESET = 'ilwpkyff' 
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const FORM_DATA = new FormData()

  FORM_DATA.append('file', ev.target.files[0])
  FORM_DATA.append('upload_preset', UPLOAD_PRESET)

  try {
      const res = await fetch(UPLOAD_URL, {
          method: 'POST',
          body: FORM_DATA
      })
      const { url } = await res.json()
      return url
  } catch (err) {
      console.error('ERROR!', err)
  }
}