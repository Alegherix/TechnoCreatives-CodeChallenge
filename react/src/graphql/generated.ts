import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** ISO 6801 datetime */
  Iso8601: any;
};

export type Balloon = {
  __typename?: 'Balloon';
  /** The date since this balloon has been available for sale. */
  availableSince: Scalars['Iso8601'];
  color: Color;
  description: Scalars['String'];
  id: Scalars['String'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  /** This is denominated in SEK. */
  price: Scalars['Int'];
  variant: Variant;
};

export type BalloonConnection = {
  __typename?: 'BalloonConnection';
  edges: Array<BalloonEdge>;
  pageInfo: PageInfo;
};

export type BalloonEdge = {
  __typename?: 'BalloonEdge';
  cursor: Scalars['String'];
  node: Balloon;
};

export enum Color {
  Black = 'BLACK',
  Blue = 'BLUE',
  Green = 'GREEN',
  Orange = 'ORANGE',
  Pink = 'PINK',
  Purple = 'PURPLE',
  Red = 'RED',
  White = 'WHITE',
  Yellow = 'YELLOW'
}

export type FilterInput = {
  color?: InputMaybe<Color>;
  variant?: InputMaybe<Variant>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** Get a balloon by id. */
  balloon?: Maybe<Balloon>;
  /**
   * This API follows a simplified version of the Relay pagination pattern. Specify an ID on
   * after or before to get 5 results. There is no option for controlling the count.
   *
   * You can use variant and color to filter only matching results of those types.
   */
  balloons: BalloonConnection;
};


export type QueryBalloonArgs = {
  id: Scalars['String'];
};


export type QueryBalloonsArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  filter?: InputMaybe<FilterInput>;
  sort?: InputMaybe<SortInput>;
};

export enum SortInput {
  AvailableSince = 'AVAILABLE_SINCE',
  Color = 'COLOR',
  Id = 'ID',
  Name = 'NAME',
  Price = 'PRICE'
}

export enum Variant {
  Heart = 'HEART',
  Normal = 'NORMAL',
  Star = 'STAR'
}

export type GetBalloonDataQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetBalloonDataQuery = { __typename?: 'Query', balloon?: { __typename: 'Balloon', id: string, name: string, imageUrl: string, description: string, color: Color, variant: Variant, price: number, availableSince: any } | null };

export type BalloonPriceQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type BalloonPriceQuery = { __typename?: 'Query', balloon?: { __typename?: 'Balloon', price: number } | null };

export type BalloonsQueryVariables = Exact<{
  endCursor?: InputMaybe<Scalars['ID']>;
  filter?: InputMaybe<FilterInput>;
  sort?: InputMaybe<SortInput>;
}>;


export type BalloonsQuery = { __typename?: 'Query', balloons: { __typename: 'BalloonConnection', edges: Array<{ __typename?: 'BalloonEdge', cursor: string, node: { __typename: 'Balloon', id: string, name: string, imageUrl: string, description: string, color: Color, variant: Variant, price: number, availableSince: any } }>, pageInfo: { __typename: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasPreviousPage: boolean, hasNextPage: boolean } } };

export type BalloonDataFragment = { __typename: 'Balloon', id: string, name: string, imageUrl: string, description: string, color: Color, variant: Variant, price: number, availableSince: any };

export const BalloonDataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BalloonData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Balloon"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"variant"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"availableSince"}}]}}]} as unknown as DocumentNode<BalloonDataFragment, unknown>;
export const GetBalloonDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBalloonData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"balloon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BalloonData"}}]}}]}},...BalloonDataFragmentDoc.definitions]} as unknown as DocumentNode<GetBalloonDataQuery, GetBalloonDataQueryVariables>;
export const BalloonPriceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BalloonPrice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"balloon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<BalloonPriceQuery, BalloonPriceQueryVariables>;
export const BalloonsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Balloons"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endCursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"balloons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endCursor"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BalloonData"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},...BalloonDataFragmentDoc.definitions]} as unknown as DocumentNode<BalloonsQuery, BalloonsQueryVariables>;