function deconstructFirebaseName(name) {
  const tokens = name.split(" ");
  if (tokens.length === 1) {
    return { "first_name": name };
  }
  if (tokens.length === 2) {
    return { "first_name": tokens[0], "last_name": tokens[1]};
  }

  const fname = tokens.slice(0, -2).join(" ");
  const mname = tokens.slice(-2, -1)[0];
  const lname = tokens.slice(-1)[0];

  return {
    "first_name": fname,
    "last_name": lname,
    "username": uname
  };
}

function enterIfValid(base, key, value, defaultValue) {
  let copy = Object.assign(base);
  if (value !== undefined && value !== null) {
    copy[key] = value;
  } else if (defaultValue !== undefined) {
    copy[key] = defaultValue;
  }

  return copy;
}

exports.enterIfValid = enterIfValid;
exports.deconstructFirebaseName = deconstructFirebaseName;