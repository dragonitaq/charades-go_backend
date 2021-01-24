exports.userController = (req, res) => {
  console.log(req.params.username);

  res.status(200);
  res.json({
    status: 'success',
    data: null,
  });
};
