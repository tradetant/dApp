import {Widget} from "@typeform/embed-react";

export function TypeForm({formId}: { formId: string }) {
    return (
        <Widget id={formId} style={{height: "100%"}}/>
    );
}