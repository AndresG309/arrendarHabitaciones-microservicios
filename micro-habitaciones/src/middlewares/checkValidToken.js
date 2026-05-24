const USERS_API = 'http://localhost:3001/usuarios/validar-token'

async function checkValidToken(req, res, next) {
  try {
    const { token } = req.body

    // Revisar si se recibió el token
    if (!token) {
      res.status(404).json({
        success: false,
        message: 'No se ha recibido un token de usuario',
      })
      return
    }

    // Hacer consulta al microservicio de usuarios
    const response = await fetch(USERS_API, {
      body: {
        token,
      },
    })

    // En caso que la respuesta fue erronea, terminar proceso
    if (!response.success) {
      res.status(404).json({
        success: false,
        message: 'El token es inválido',
      })
      return
    }

    // Añadir los datos del usuario a la petición para ser usados por el controller
    req.user = response.data
    
    // Mandar la petición al siguiente paso
    next()
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuario',
      error: error instanceof Error ? error.message : 'Error desconocido',
    })
    return
  }
}

export { checkValidToken }
