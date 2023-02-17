import { GraphQLResolveInfo } from 'graphql';
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
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
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

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Engagement: ResolverTypeWrapper<Engagement>;
  FilterInput: FilterInput;
  FilterResult: ResolverTypeWrapper<FilterResult>;
  Influencer: ResolverTypeWrapper<Influencer>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Engagement: Engagement;
  FilterInput: FilterInput;
  FilterResult: FilterResult;
  Influencer: Influencer;
  Int: Scalars['Int'];
  Query: {};
  String: Scalars['String'];
};

export type EngagementResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Engagement'] = ResolversParentTypes['Engagement'],
> = {
  authentic?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  average?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FilterResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FilterResult'] = ResolversParentTypes['FilterResult'],
> = {
  nodes?: Resolver<
    Array<Maybe<ResolversTypes['Influencer']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InfluencerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Influencer'] = ResolversParentTypes['Influencer'],
> = {
  ID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  categories?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  engagement?: Resolver<ResolversTypes['Engagement'], ParentType, ContextType>;
  followers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  screenName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  all?: Resolver<ResolversTypes['FilterResult'], ParentType, ContextType>;
  categories?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  countries?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  filter?: Resolver<
    ResolversTypes['FilterResult'],
    ParentType,
    ContextType,
    RequireFields<QueryFilterArgs, 'filter'>
  >;
};

export type Resolvers<ContextType = any> = {
  Engagement?: EngagementResolvers<ContextType>;
  FilterResult?: FilterResultResolvers<ContextType>;
  Influencer?: InfluencerResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};
