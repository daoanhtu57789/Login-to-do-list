import { toast } from "react-toastify";

export const toastError = error => {
    if (
        typeof error === "string" &&
        error !== null &&
        error !== "undefined" &&
        error !== ""
    ) {
        return toast.error(error);
    }
};

export const toastSuccess = message => {
    if (message !== null && typeof message !== "undefined" && message !== "") {
        return toast.success(message);
    }
};
