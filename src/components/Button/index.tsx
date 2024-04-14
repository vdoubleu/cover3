import Link from 'next/link';

type ButtonProps = {
  onClick: () => void;
  text: string;
  type?: 'primary' | 'secondary';
  disabled?: boolean;
  buttonStyle?: 'basic' | 'simple';
  iconBefore?: any;
  iconAfter?: any;
}

export default function Button({
  onClick,
  text,
  type = 'primary',
  disabled = false,
  buttonStyle = 'basic',
  iconBefore,
  iconAfter,
}: ButtonProps) {
  const disabledbuttonStyle = disabled ? 'opacity-50 cursor-not-allowed' : '';

  if (buttonStyle === 'simple') {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className="bg-transparent text-primary"
      >
        <div className="flex gap-2 justify-center align-center">
          {iconBefore && <div>{iconBefore}</div>}
          <div>
            {text}
          </div>
          {iconAfter && <div>{iconAfter}</div>}
        </div>
      </button>
    );
  }


  const buttonType = type === 'primary' ? 'bg-blue-950 text-white' : 'bg-slate-400 text-slate-950';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-8 py-4 rounded-full font-bold text-center max-w-fit text-3xl drop-shadow active:drop-shadow-none active:shadow-inner active:bg-blue-900 ${buttonType} ${disabledbuttonStyle}`}
    >
      {text}
    </button>
  );
}

type LinkButtonProps = {
  href: string;
  text: string;
  type?: 'primary' | 'secondary';
  disabled?: boolean;
  buttonStyle?: 'basic' | 'simple';
}

export const LinkButton = ({
  href,
  text,
  type = 'primary',
  disabled = false,
  buttonStyle = 'basic',
}: LinkButtonProps) => {
  const disabledbuttonStyle = disabled ? 'opacity-50 cursor-not-allowed' : '';
  if (buttonStyle === 'simple') {
    return (
      <Link href={href}>
        <div
          className={"px-4 py-2 rounded-full font-bold bg-transparent text-primary border border-primary " + disabledbuttonStyle}
        >
          {text}
        </div>
      </Link>
    );
  }

  const buttonType = type === 'primary' ? 'bg-blue-950 text-white' : 'bg-slate-400 text-slate-950';

  return (
    <Link href={href}>
      <div
        className={`px-8 py-4 rounded-full font-bold text-center max-w-fit text-3xl drop-shadow active:drop-shadow-none active:shadow-inner active:bg-blue-900 ${buttonType} ${disabledbuttonStyle}`}
      >
        {text}
      </div>
    </Link>
  );
}

export const HelpButton = () => {
  return (
      <Link href="/help">
        <div className="fixed bottom-4 right-4 text-right p-2 rounded-md outline outline-solid border-blue-800">HELP</div>
      </Link>
  );
}
