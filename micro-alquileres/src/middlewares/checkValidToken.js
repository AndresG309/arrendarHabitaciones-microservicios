const USERS_API = 'http://localhost:3001/api/auth/verify-token'

async function checkValidToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization

    // Revisar si se recibió el token
    if (!authHeader) {
      res.status(404).json({
        success: false,
        message: 'No se ha recibido un token de usuario',
      })
      return
    }

    // Formato: "Bearer token"
    const token = authHeader.split(' ')[1]

    const response = await fetch(USERS_API, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()

    // En caso que la respuesta fue erronea, terminar proceso
    if (!data.success) {
      res.status(404).json({
        success: false,
        message: 'El token es inválido',
      })
      return
    }

    // Añadir los datos del usuario a la petición para ser usados por el controller
    req.user = data.data

    // Mandar la petición al siguiente paso
    next()
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuario',
      error: error instanceof Error ? error.message : 'Error desconocido',
    })
    return
  }
}

export { checkValidToken }
