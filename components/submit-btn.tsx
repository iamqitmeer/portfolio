import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function SubmitBtn() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="btn-primary mt-1 self-start disabled:cursor-wait disabled:opacity-60"
    >
      {pending ? (
        <>
          <span
            aria-hidden
            className="h-4 w-4 animate-spin rounded-full border-2 border-ink/25 border-t-ink"
          />
          Sending
        </>
      ) : (
        "Send message"
      )}
    </button>
  );
}
