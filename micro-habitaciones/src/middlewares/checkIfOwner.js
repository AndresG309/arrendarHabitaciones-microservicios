const USERS_API = ''

async function checkIfOwner(req, res, next) {
  try {
    const { token } = req.body

    if (!token) {
      res.status(404).json({
        success: false,
        message: 'No se ha recibido un token de usuario',
      })
      return
    }
    const response = await fetch(USERS_API, {
      body: {
        token,
      },
    })

    if (!response.success) {
      res.status(404).json({
        success: false,
        message: 'El token es inválido',
      })
      return
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuario',
      error: error instanceof Error ? error.message : 'Error desconocido',
    })
    return
  }

  next()
}

export { checkIfAdmin }
