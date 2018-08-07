import * as React from "react";
import { Query, Mutation, MutationFn } from "react-apollo";
import gql from "graphql-tag";

const updateFormEvent = (mutation: MutationFn<IMutationData, any>) => (
  e: React.FormEvent<HTMLInputElement>
) => {
  e.preventDefault();
  mutation({ variables: { content: e.currentTarget.value } });
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
  updateForm: { content: string };
}

interface IMutationVariables {
  content: string;
}

export const UPDATE_FORM_CONTENT = gql`
  mutation UpdateForm($content: String!) {
    updateForm(content: $content)
  }
`;

// This is a little clunky
class FormInputQuery extends Query<IQueryData> {}
class FormUpdateMutation extends Mutation<IMutationData, IMutationVariables> {}

const Input = () => (
  <FormInputQuery query={GET_DEFAULT_INPUT_CONTENT}>
    {({ loading, error, data }) => {
      if (loading) {
        return <div>LOADING</div>;
      }

      if (error) {
        return <div>ERROR</div>;
      }

      return (
        <FormUpdateMutation mutation={UPDATE_FORM_CONTENT}>
          {(updateForm, response) => (
            <div>
              <input
                onBlur={updateFormEvent(updateForm)}
                defaultValue={data && data.form && data.form.input}
              />
              <div>{response && response.data && response.data.updateForm}</div>
            </div>
          )}
        </FormUpdateMutation>
      );
    }}
  </FormInputQuery>
);

export default Input;
