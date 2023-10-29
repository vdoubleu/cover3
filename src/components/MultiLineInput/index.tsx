import Typography from "../Typography";

export type MultiLineInputProps = {
    labelText: string;
    name: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>; 
}

function MultiLineInput(props: MultiLineInputProps) {
    return (
        <div className="flex flex-col w-full">
            <Typography type="basic" className="text-left">{props.labelText}</Typography>
            <textarea className="border rounded-2xl px-3 py-2.5 mt-0.5" id={props.name} onChange={props.onChange} value={props.value} rows={3} />
        </div>
    );
}

export default MultiLineInput
