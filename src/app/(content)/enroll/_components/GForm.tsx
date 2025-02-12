export function GForm({formId}: { formId: string }) {
    return (
        <iframe
            className="w-full h-full"
            src={`https://docs.google.com/forms/d/e/${formId}/viewform?embedded=true`}
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}>Loading…
        </iframe>
    );
}