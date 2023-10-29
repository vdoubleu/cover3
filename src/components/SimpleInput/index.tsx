import Typography from "../Typography";

export type SimpleInputProps = {
    type?: string;
    labelText: string;
    name: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SimpleInput(props: SimpleInputProps) {
    const inputType = props.type || 'text';

    const pattern = props.type === 'number' ? '[0-9]*' : props.type === 'email' ? '' : undefined;
    const inputMode = props.type === 'number' ? 'numeric' : undefined;

    return (
        <div className="flex flex-col w-full">
            <Typography type="basic" className="text-left">{props.labelText}</Typography>
            <input className="border rounded-2xl px-3 py-2.5 mt-0.5" type={inputType} id={props.name} pattern={pattern}  inputMode={inputMode} onChange={props.onChange} value={props.value} />
        </div>
    );
}

export default SimpleInput
