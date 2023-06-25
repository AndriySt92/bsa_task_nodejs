const responseMiddleware = (req, res, next) => {
  if (res.err) {
    return res.json({ error: true, message: `${res.err}` })
  } else if (res.data) {
    return res.json(res.data)
  }

  next()
}

export { responseMiddleware }
