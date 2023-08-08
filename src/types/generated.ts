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
}