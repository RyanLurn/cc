import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "@repo/auth/constants";
import { useSelector } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import {
  CardDescription,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  Card,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { INTERNAL_SERVER_ERROR_MESSAGE } from "@/error/constants";
import { authClient } from "@/features/auth/client";
import { useAppForm } from "@/lib/form/hooks";
import { RedirectSearchParamSchema } from "@/lib/schemas";
import { Route as AccountRoute } from "@/routes/_authenticated/account";

export const Route = createFileRoute("/(auth)/sign-in/")({
  validateSearch: RedirectSearchParamSchema,
  component: SignInPage,
});

const EmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .normalize("NFC")
  .pipe(z.email("Invalid email.").max(254, "Email is too long."));
const PasswordSchema = z
  .string()
  .min(MIN_PASSWORD_LENGTH, "Password is too short.")
  .max(MAX_PASSWORD_LENGTH, "Password is too long.");
const RememberMeSchema = z.boolean();
const SignInSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  rememberMe: RememberMeSchema,
});

function SignInPage() {
  const { redirect } = Route.useSearch();

  const signInForm = useAppForm({
    formId: "sign-in-form",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
    validators: {
      onSubmit: SignInSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      // The signInValidator transforms email.
      // However, TanStack Form doesn't use the output of validators for the value.
      // So, we need to parse it again here to get the transformed email.
      const parsedValue = SignInSchema.parse(value);

      const { data, error } = await authClient.signIn.email({
        ...parsedValue,
        callbackURL: redirect ?? AccountRoute.to,
      });

      if (data) {
        toast.add({
          type: "success",
          description: `Welcome back, ${data.user.name}!`,
        });
        return;
      }

      if (error.code === "INVALID_EMAIL") {
        formApi.setFieldMeta("email", (prev) => ({
          ...prev,
          errorMap: {
            onServer: [{ message: error.message ?? "Invalid email." }],
          },
        }));
        return;
      }

      toast.add({
        type: "error",
        description: error.message ?? INTERNAL_SERVER_ERROR_MESSAGE,
      });
    },
  });

  const isSubmitting = useSelector(
    signInForm.store,
    (state) => state.isSubmitting,
  );

  return (
    <div className="flex size-full flex-col items-center justify-center">
      <Card className="w-full sm:max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign in</CardTitle>
          <CardDescription>
            Enter your credentials below to sign in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Sign in form UI */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void signInForm.handleSubmit();
            }}
            id={signInForm.formId}
          >
            <FieldGroup>
              {/* Email input field */}
              <signInForm.AppField
                validators={{
                  onChange: EmailSchema,
                }}
                name="email"
              >
                {(appField) => (
                  <appField.TextField
                    placeholder="youremail@example.com"
                    disabled={isSubmitting}
                    label="Email"
                    type="email"
                  />
                )}
              </signInForm.AppField>
              {/* Password input field */}
              <signInForm.AppField
                validators={{
                  onChange: PasswordSchema,
                }}
                name="password"
              >
                {(appField) => (
                  <appField.TextField
                    placeholder={"*".repeat(MIN_PASSWORD_LENGTH)}
                    disabled={isSubmitting}
                    label="Password"
                    type="password"
                  />
                )}
              </signInForm.AppField>
              {/* Remember me checkbox */}
              <signInForm.AppField
                validators={{
                  onChange: RememberMeSchema,
                }}
                name="rememberMe"
              >
                {(appField) => (
                  <appField.CheckField
                    disabled={isSubmitting}
                    className="rounded-sm"
                    label="Remember me"
                  />
                )}
              </signInForm.AppField>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-y-2">
          <signInForm.AppForm>
            {/* Submit button */}
            <signInForm.SubmitButton
              submittingText="Signing in..."
              submitText="Sign in"
              className="w-full"
            />
          </signInForm.AppForm>
        </CardFooter>
      </Card>
    </div>
  );
}
