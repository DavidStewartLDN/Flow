/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDiaryEntry = /* GraphQL */ `
  query GetDiaryEntry($id: ID!) {
    getDiaryEntry(id: $id) {
      id
      title
      body
      score
      type
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listDiaryEntrys = /* GraphQL */ `
  query ListDiaryEntrys(
    $filter: ModelDiaryEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDiaryEntrys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        body
        score
        type
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getDiaryEntrysByCreatedAt = /* GraphQL */ `
  query GetDiaryEntrysByCreatedAt(
    $type: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDiaryEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getDiaryEntrysByCreatedAt(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        body
        score
        type
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
