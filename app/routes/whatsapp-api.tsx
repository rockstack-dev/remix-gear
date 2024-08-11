import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, Link, useNavigation } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { useTypedActionData } from "remix-typedjson";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import clsx from "clsx";
import HomeBreadcrumb from "~/components/HomeBreadcrumb";
import { Input } from "~/components/ui/input";

type ActionData = { success?: string; error?: string };
export let action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const action = form.get("action");
  if (action === "submission") {
    let metaToken = form.get("meta-token")?.toString() || process.env.META_TOKEN;
    if (!metaToken) {
      return json({ error: "Missing META token" }, { status: 400 });
    }
    const business_phone_number_id = form.get("business-phone-number-id");
    const end_user_umber = form.get("end-user-number");
    const message = form.get("message");
    const response = await fetch(`https://graph.facebook.com/v20.0/${business_phone_number_id}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${metaToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: end_user_umber,
        text: { body: message },
        //  context: {
        //    message_id: message.id,
        //  },
      }),
    });
    if (!response.ok) {
      const data = await response.json();
      return json({ error: "Failed to send message: " + data.error?.message }, { status: 400 });
    }
    return json({ success: "Message sent successfully!" });
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
    } else if (actionData?.error) {
      toast.error(actionData.error);
    }
  }, [actionData]);
  return (
    <div className="mx-auto max-w-2xl space-y-3 p-12">
      <HomeBreadcrumb title="WhatsApp API" />
      <h1 className="text-3xl font-bold">Remix WhatsApp API</h1>
      <div>
        <Form ref={formRef} method="post" className="space-y-1">
          <input type="hidden" name="action" value="submission" readOnly hidden />
          <Input name="meta-token" defaultValue="" placeholder="META token (not required when set as an environment variable)" />
          <Input name="business-phone-number-id" defaultValue="" placeholder="Business phone number ID" required />
          <Input name="end-user-number" defaultValue="" placeholder="End-user number (must be a valid WhatsApp test number)" required />
          <Textarea name="message" defaultValue="Hi" placeholder="Message..." required disabled={isSubmitting} />

          <div className="mt-1 flex items-center justify-end space-x-2">
            <Button asChild variant="link" size="sm">
              <Link to="https://developers.facebook.com/apps/creation/">Create a Facebook App</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting} className={clsx(isSubmitting && "base-spinner")}>
              Submit
            </Button>
          </div>
        </Form>

        <div className="mt-3 rounded-lg border border-yellow-300 bg-yellow-100 p-3 text-xs text-yellow-900 opacity-50">
          Webhooks will only work with when you've set up the <pre className="inline">META_TOKEN</pre> environment variable.
        </div>
      </div>
    </div>
  );
}
