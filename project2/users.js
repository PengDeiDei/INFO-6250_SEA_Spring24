function isValidUsername(username) {
  let isValid = true;
  isValid = isValid && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]{1,20}$/);
  return isValid;
}

module.exports = {
  isValidUsername,
};
