import { Button, Typography } from "@mui/material";
import {
  SubmitHandler,
  FieldValues,
  UseFormReturn,
  DefaultValues,
} from "react-hook-form";
import FormProviderWrapper from "./FormPrividerWrapper";
import { ZodSchema } from "zod";

interface BaseFormProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
  defaultValues: DefaultValues<T>;
  submitButtonText: string;
  formTitle: string;
  schema: ZodSchema<T>;
  children: React.ReactNode;
}

const BaseForm = <T extends FieldValues>({
  onSubmit,
  defaultValues,
  submitButtonText,
  formTitle,
  schema,
  children,
}: BaseFormProps<T>) => {
  return (
    <FormProviderWrapper<T> defaultValues={defaultValues} schema={schema}>
      {({ handleSubmit, reset }: UseFormReturn<T>) => (
        <form
          onSubmit={handleSubmit((data: T) => {
            onSubmit(data);
            reset(defaultValues as T);
          })}
        >
          {formTitle && (
            <Typography variant="h4" gutterBottom>
              {formTitle}
            </Typography>
          )}
          {children}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginTop: "10px" }}
          >
            {submitButtonText}
          </Button>
        </form>
      )}
    </FormProviderWrapper>
  );
};

export default BaseForm;
