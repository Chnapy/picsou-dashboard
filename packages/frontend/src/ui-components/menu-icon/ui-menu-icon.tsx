import { IconButton, Menu } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVertSharp';
import React from 'react';

type UIMenuIconProps = {
    children: (closeMenu: () => void) => React.ReactNode;
};

export const UIMenuIcon: React.FC<UIMenuIconProps> = ({ children }) => {
    const [ anchorEl, setAnchorEl ] = React.useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = e => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuContentToArray = (rawContent: React.ReactNode): React.ReactNode[] => {
        if (!React.isValidElement(rawContent)) {
            return [];
        }

        if (rawContent.type === React.Fragment) {
            return React.Children.toArray(rawContent.props.children)
        }

        return [ rawContent ];
    };

    const menuContent = menuContentToArray(children(handleClose))
        .map((child, i) => {
            if (React.isValidElement(child) && child.key === null) {
                child = React.cloneElement(child, { key: i });
            }

            return child;
        });

    return (
        <>

            {menuContent.length > 0 && <IconButton onClick={handleClick} size='small'>
                <MoreVertIcon />
            </IconButton>}


            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {menuContent}
            </Menu>
        </>
    )
};
