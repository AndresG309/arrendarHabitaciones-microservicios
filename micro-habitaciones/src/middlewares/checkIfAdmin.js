async function checkIfAdmin(req, res, next) {
  try {
    const { user } = req

    if (user.rol !== 'admin') {
      res.status(404).json({
        success: false,
        message: 'El usuario no tiene permisos para realizar esta acción',
      })
      return
    }

    next()
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al procesar el usuario',
      error: error instanceof Error ? error.message : 'Error desconocido',
    })
    return
  }
}

export { checkIfAdmin }
