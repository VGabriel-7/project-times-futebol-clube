export interface IJwt {
  id: number;
  username: string;
  role: string;
  email: string;
}

export interface IToken {
  data: {
    id: number;
    username: string;
    role: string;
    email: string;
  };
  iat: number;
  exp: number;
}
