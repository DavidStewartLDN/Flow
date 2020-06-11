/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDiaryEntry = /* GraphQL */ `
  mutation CreateDiaryEntry(
    $input: CreateDiaryEntryInput!
    $condition: ModelDiaryEntryConditionInput
  ) {
    createDiaryEntry(input: $input, condition: $condition) {
      id
      title
      body
      score
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateDiaryEntry = /* GraphQL */ `
  mutation UpdateDiaryEntry(
    $input: UpdateDiaryEntryInput!
    $condition: ModelDiaryEntryConditionInput
  ) {
    updateDiaryEntry(input: $input, condition: $condition) {
      id
      title
      body
      score
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteDiaryEntry = /* GraphQL */ `
  mutation DeleteDiaryEntry(
    $input: DeleteDiaryEntryInput!
    $condition: ModelDiaryEntryConditionInput
  ) {
    deleteDiaryEntry(input: $input, condition: $condition) {
      id
      title
      body
      score
      createdAt
      updatedAt
      owner
    }
  }
`;
