interface JwtObj {
  secret: string;
}

const jwtObj = {} as JwtObj;

if (typeof process.env.JWT_SECRET_KEY === 'string') {
  jwtObj.secret = process.env.JWT_SECRET_KEY;
} else {
  console.log('JWT_SECRET_KEY');
}

export default jwtObj;
