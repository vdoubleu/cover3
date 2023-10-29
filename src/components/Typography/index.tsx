type TypographyProps = {
  children?: React.ReactNode;
  type?: "header" | "subheader" | "subheader2" | "subheader3" | "body" | "button" | "basic" | "mini";
  className?: string;
};


export default function Typography({ children, type="basic", className }: TypographyProps) {
  let styling;
  switch (type) {
    case "header":
      styling = "text-4xl";
      break;
    case "subheader":
      styling = "text-2xl";
      break;
    case "subheader2":
      styling = "text-base text-slate-700";
      break;
    case "subheader3":
      styling = "text-2xl text-slate-700";
      break;
    case "body":
      styling = "text-lg";
      break;
    case "button":
      styling = "text-lg font-bold";
      break;
    case "basic":
      styling = "text-xl";
      break;
    default:
      styling = "";
      break;
  }

  return (
    <div className={`${styling} ${className}`} >
      {children}
    </div>
  );
}
