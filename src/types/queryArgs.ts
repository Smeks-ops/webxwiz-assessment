export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
};
export type MutationCreateUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  secretKey?: Scalars['String'];
};

export type MutationResetPasswordArgs = {
  email: Scalars['String'];
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type MutationEnable2FAArgs = {
  email: Scalars['String'];
};
