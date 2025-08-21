import { useState, type ChangeEvent } from "react";

export function useInput(defaultValue = ''): [string, ((event: ChangeEvent<HTMLInputElement>) => void)] {
    const [value, setValue] = useState(defaultValue);

    function onValueChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
        setValue(event.target.value);
    }

    return [value, onValueChangeHandler]
}
