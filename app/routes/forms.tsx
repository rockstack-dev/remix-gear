import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { useTypedActionData } from "remix-typedjson";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import clsx from "clsx";
import HomeBreadcrumb from "~/components/HomeBreadcrumb";

type ActionData = {
  success: string;
};
export let action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const action = form.get("action");
  if (action === "submission") {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const message = form.get("message");
    return json({ success: "Form submitted: " + message });
  }
};

export default function () {
  const actionData = useTypedActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (actionData?.success) {
      toast.success(actionData.success);
      formRef.current?.reset();
    }
  }, [actionData]);
  return (
    <div className="space-y-3 p-12">
      <HomeBreadcrumb title="Form Actions" />
      <h1 className="text-3xl font-bold">Remix Form Actions</h1>
      <div>
        <Form ref={formRef} method="post" className="space-y-1">
          <input type="hidden" name="action" value="submission" readOnly hidden />
          <Textarea name="message" defaultValue="My form submission message" rows={3} />

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} className={clsx(isSubmitting && "base-spinner")}>
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
