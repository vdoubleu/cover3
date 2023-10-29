import Image from 'next/image';
import logoIcon from "../../../public/static/logo.svg";
import logoNameIcon from "../../../public/static/logo-name.svg";

export const Logo = () => {
    return (
        <Image
          priority
          src={logoIcon}
          alt="logo"
        />
    );
}

export const LogoName = () => {
    return (
        <Image
          priority
          src={logoNameIcon}
          alt="logo"
          className="w-40 h-10"
        />
    );
}

