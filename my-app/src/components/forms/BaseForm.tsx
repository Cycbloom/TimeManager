import { Button, Typography } from "@mui/material";
import {
  SubmitHandler,
  FieldValues,
  UseFormReturn,
  DefaultValues,
} from "react-hook-form";
import FormProviderWrapper from "./FormPrividerWrapper";
import { ZodSchema } from "zod";
import { useEffect } from "react";

interface BaseFormProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
  defaultValues: DefaultValues<T>;
  submitButtonText?: string;
  formTitle: string;
  schema: ZodSchema<T>;
  children: React.ReactNode;
  resetAfterSubmit?: boolean;
  onFormDataChange?: (data: T) => void;
}

const BaseForm = <T extends FieldValues>({
  onSubmit,
  defaultValues,
  submitButtonText,
  formTitle,
  schema,
  children,
  resetAfterSubmit = true,
  onFormDataChange,
}: BaseFormProps<T>) => {
  return (
    <FormProviderWrapper<T> defaultValues={defaultValues} schema={schema}>
      {({ handleSubmit, reset, watch }: UseFormReturn<T>) => {
        // 监听所有字段的变化
        const formData = watch();

        // 当表单数据变化时调用 onFormDataChange
        useEffect(() => {
          onFormDataChange?.(formData);
        }, [JSON.stringify(formData), onFormDataChange]);

        return (
          <form
            onSubmit={handleSubmit((data: T) => {
              onSubmit(data);
              if (resetAfterSubmit) {
                reset(defaultValues as T);
              }
            })}
          >
            {formTitle && (
              <Typography variant="h4" gutterBottom>
                {formTitle}
              </Typography>
            )}
            {children}
            {submitButtonText && (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginTop: "10px" }}
              >
                {submitButtonText}
              </Button>
            )}
          </form>
        );
      }}
    </FormProviderWrapper>
  );
};

export default BaseForm;
