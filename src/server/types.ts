export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Engagement = {
  authentic: Scalars['Int'];
  average: Scalars['Int'];
};

export type FilterResult = {
  nodes: Array<Maybe<Influencer>>;
};

export type Influencer = {
  ID: Scalars['String'];
  categories: Array<Scalars['String']>;
  country: Scalars['String'];
  engagement: Engagement;
  followers: Scalars['Int'];
  screenName?: Maybe<Scalars['String']>;
};

export type Query = {
  all: FilterResult;
};
