import { IconButton, ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import React from 'react';

const repoLink = 'https://github.com/Chnapy/picsou-dashboard';

export const GithubRepoButton: React.FC = () => (
    <IconButton href={repoLink} target="_blank">
        <GitHubIcon />
    </IconButton>
);

export const GithubRepoMenuItem: React.FC = () => (
    <MenuItem component='a' button href={repoLink} target="_blank">
        <ListItemIcon>
            <GitHubIcon />
        </ListItemIcon>
        <ListItemText primary='Repository' />
    </MenuItem>
);
