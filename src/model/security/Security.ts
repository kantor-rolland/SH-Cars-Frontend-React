export type Token = {
  id_token: string;
};

// TODO: nem biztos van mindenre szukseg
export type JWTPayload = {
  authority: string;
  privileges: string;
  sub: string;
};

export enum Role {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER',
}
