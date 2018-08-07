// @flow strict
import React from "react";
import { Query, Mutation } from "react-apollo";
import type { QueryRenderProps, MutationFunction, MutationResult } from "react-apollo";
import gql from "graphql-tag";

export const GET_DEFAULT_INPUT_CONTENT = gql`
  query {
    form {
      input
    }
  }
`;

export const UPDATE_FORM_CONTENT = gql`
  mutation UpdateForm($content: String!) {
    updateForm(content: $content)
  }
`;

type QueryResponse = {|
  form: {
    input: string
  }
|};

type MutationVariables = {|
  content: string
|};

type MutationResponse = {|
  updateForm: string
|};

const updateFormEvent = mutation => (e: SyntheticEvent<HTMLInputElement>) => {
  e.preventDefault();
  mutation({ variables: { content: e.currentTarget.value } });
};

const Input = () => (
  <Query query={GET_DEFAULT_INPUT_CONTENT}>
    {({ loading, error, data }: QueryRenderProps<QueryResponse>) => {
      if (loading) {
        return <div>LOADING</div>;
      }

      if (error) {
        return <div>ERROR</div>;
      }

      return (
        <Mutation mutation={UPDATE_FORM_CONTENT}>
          {(
            updateForm: MutationFunction<MutationResponse, MutationVariables>,
            response: MutationResult<MutationResponse>
          ) => (
            <div>
              <input
                onBlur={updateFormEvent(updateForm)}
                defaultValue={data && data.form && data.form.input}
              />
              <div>{response && response.data && response.data.updateForm}</div>
            </div>
          )}
        </Mutation>
      );
    }}
  </Query>
);

export default Input;
