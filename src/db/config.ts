const configdb = () => {
  const url = `${process.env.PRE_URL_DB}://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.URL_DB}/${process.env.PARAMS_DB}`;
  return url;
};
export default configdb;
