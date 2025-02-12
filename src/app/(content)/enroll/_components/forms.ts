import {GForm} from "./GForm";
import {TypeForm} from "./TypeForm";

interface IForm {
    Component: React.FC<{formId: string}>;
    formId: string;
}

export const FORMS: Record<string, IForm> = {
    "hackathon": {
        Component: TypeForm,
        formId: "Iupgq2SK",
    },
    "hackathon-g": {
        Component: GForm,
        formId: "1FAIpQLScej4Ef9UVdiDe-NGSRs3jpkFZf5CQbdxJXrMxmiF2b8TLWkQ",
    },
}