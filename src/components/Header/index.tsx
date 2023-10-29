"use client";

import { LogoName } from '../Logo';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type HeaderProps = {
    hasBackButton?: boolean;
    backOnClick?: () => void;
    backText?: string;
    logoOnClick?: () => void;
    actionButtonUrl?: string;
    actionButtonText?: string;
    actionButtonIcon?: any;
}

const Header = ({ hasBackButton = true, backOnClick, backText, logoOnClick, actionButtonUrl, actionButtonText, actionButtonIcon }: HeaderProps) => {
  const router = useRouter();

  const backButton = hasBackButton ? (
    <Button
      onClick={() => { 
        if (backOnClick) {
          backOnClick();
        } else {
          router.back();
        }
      }}
      text={backText ?? "Back"}
      type="secondary"
      buttonStyle="simple"
      iconBefore={<FontAwesomeIcon icon={faChevronLeft} />}
    />
  ) : <div/>;

  const actionButton = actionButtonUrl ? (
    <Button
      onClick={() => router.push(actionButtonUrl)}
      text={actionButtonText || ""}
      type="primary"
      buttonStyle="simple"
      iconAfter={<FontAwesomeIcon icon={actionButtonIcon} />}
    />
  ) : <div/>;

  return (
      <div className="grid grid-cols-3 grid-rows-1 gap-3 mt-4">
        {backButton}
        <div className="flex justify-center" onClick={() => logoOnClick ? logoOnClick() : router.push("/")} >
          <LogoName />
        </div>
        {actionButton}
      </div>
  );
}

export default Header;
