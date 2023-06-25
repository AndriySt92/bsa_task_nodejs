const responseMiddleware = (_, res, next) => {
  if (res.err) {
    return res.status(res.errCode).json({ error: true, message: `${res.err}` })
  } else if (res.data) {
    return res.json(res.data)
  }

  next()
}

export { responseMiddleware }
