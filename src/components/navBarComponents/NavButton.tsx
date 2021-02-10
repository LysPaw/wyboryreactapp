import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { HiChevronDown } from 'react-icons/hi';
import { StyledButton } from '../styledComponents/navBarStyle';
import { NavContainer } from './NavContainer';

type IProps = {
  content: JSX.Element;
  menuContent: Record<string, string>[];
  fetching?: boolean;
  logoutFnc?: () => void;
};

export const NavButton: React.FC<IProps> = ({ content, fetching, ...props }) => {
  const [activeButton, setActiveButton] = useState(false);

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const node = useRef<HTMLButtonElement>(null);

  const handleClick = (e: MouseEvent) => {
    if (node.current && node.current.contains(e.target as Node)) return;
    if (!activeButton) setActiveButton(false);
  };

  return (
    <Button
      onClick={async () => {
        setActiveButton(!activeButton);
      }}
      isLoading={fetching ? fetching : undefined}
      isActive={activeButton}
      variant="link"
      ref={node}
      {...StyledButton}>
      {content} <Icon as={HiChevronDown} pl="2px" mt="3px" />
      <NavContainer display={activeButton} {...props} />
    </Button>
  );
};
