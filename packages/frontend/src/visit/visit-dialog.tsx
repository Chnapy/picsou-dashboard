import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { UIButton } from '../ui-components/button/ui-button';

export const VisitDialog: React.FC = () => {
    const isVisitor = useSelector(state => state.auth.isVisitor);
    const [ open, setOpen ] = React.useState(isVisitor);

    const handleClose = () => setOpen(false);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            disableBackdropClick
        >
            <DialogTitle>Dashboard preview</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You are accessing a preview of a dashboard. All data showed here is fake and static.<br/>
                    To use the real app, check out the README of the GitHub repo.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
                <UIButton onClick={handleClose}>
                    Gotcha !
                </UIButton>
            </DialogActions>
        </Dialog>
    );
};
