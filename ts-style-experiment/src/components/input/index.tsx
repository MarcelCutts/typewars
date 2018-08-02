import * as React from "react";
import { Query, Mutation, MutationFn } from "react-apollo";
import gql from "graphql-tag";

const updateFormEvent = (mutation: MutationFn) => (e: React.FormEvent<HTMLInputElement>) => {
  e.preventDefault();
  mutation({ updateFo rm: e.currentTarget.value });
};

interface IQueryData {
  form: {
    input: string
  };
}

export const GET_DEFAULT_INPUT_CONTENT = gql`
  query {
    form {
      input
    }
  }
`;

interface IMutationData {
  updateForm: string;
}

export const UPDATE_FORM_CONTENT = gql`
  mutation {
    updateForm
  }
`;

// This is a little clunky
class FormInputQuery extends Query<IQueryData> {}
// class FormUpdateMutation extends Mutation<IMutationData> {}

const Input = () => (
  <FormInputQuery query={GET_DEFAULT_INPUT_CONTENT}>
    {({ loading, error, data }) => {
      if (loading) {
        return <div> LOADING </div>;
      } else {
        return (
          <Mutation mutation={UPDATE_FORM_CONTENT}>
            {updateForm => (
              <input onBlur={updateFormEvent(updateForm)} defaultValue={data && data.form.input} />
            )}
          </Mutation>
        );
      }
    }}
  </FormInputQuery>
);

export default Input;
