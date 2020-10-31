import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

export const VisitDialog: React.FC = () => {
    const isVisitor = useSelector(state => state.auth.isVisitor);
    const [ open, setOpen ] = React.useState(isVisitor);

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle>Dashboard preview</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You are accessing a preview of a dashboard. All data showed here is fake and static.
                    To use the real app, check out the README of the GitHub repo.
              </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};
