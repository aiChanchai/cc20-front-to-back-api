const error = (err, req, res, next) => {
  //code body
  console.log(err.message);
  res
    .status(err.code || 500)
    .json({ message: err.message || "Something Wrong!!" });
};

export default error;
