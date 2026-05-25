function checkInternalService(req, res, next) {
  const allowedIps = [
    '127.0.0.1', // localhost IPv4
    '::1', // localhost IPv6
    '::ffff:127.0.0.1', // a veces Express lo devuelve así
  ]

  if (!allowedIps.includes(req.ip)) {
    return res.status(403).json({
      success: false,
      message: 'Origen no autorizado',
    })
  }

  next()
}

export { checkInternalService }
