import { useField } from '@unform/core';
import { TextField, TextFieldProps } from '@mui/material';

type TVTextFieldProps = TextFieldProps & {
   name: string;
}
export const VTextField:  React.FC<TVTextFieldProps> = ({name, ...rest}) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);

  return (
    <TextField
      {...rest}
    />
  );
};