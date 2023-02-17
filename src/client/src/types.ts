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

export type FilterInput = {
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  countries?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
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
  categories: Array<Scalars['String']>;
  countries: Array<Scalars['String']>;
  filter: FilterResult;
};

export type QueryFilterArgs = {
  filter: FilterInput;
};
