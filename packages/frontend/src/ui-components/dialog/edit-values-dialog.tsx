import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, ListItemIcon, ListItemText, MenuItem, Tab, Tabs } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import { BoardKind, BoardValueInfos } from '@picsou/shared';
import React from 'react';
import { enumToString } from '../../util/enum-to-string';
import { NormalizeObject } from '../../util/normalize';
import { UIMenuIcon } from '../menu-icon/ui-menu-icon';
import { EditValuesLine, EditValuesLineProps } from './edit-values-line';

export type InputBoardValueInfos = Omit<BoardValueInfos, 'currentValue'>;

export type EditSearchData = Pick<InputBoardValueInfos, 'id' | 'name'> & {
    extra?: string;
    secondary?: string;
};

export type EditValuesDialogProps = EditvaluesDialogContentProps & {
    open: boolean;
};

export const EditValuesDialog: React.FC<EditValuesDialogProps> = ({
    open, ...rest
}) => (
        <Dialog open={open} onClose={rest.onClose} fullWidth maxWidth='sm' PaperProps={{ elevation: 4 }}>
            {open && <EditvaluesDialogContent {...rest} />}
        </Dialog>
    );

type EditvaluesDialogContentProps = Pick<EditValuesLineProps, 'fetchNameSearch' | 'hideNameAndId'> & {
    onClose: () => void;
    onSubmit: (data: NormalizeObject<InputBoardValueInfos>) => Promise<void>;
    board: BoardKind;
    boardInfos: InputBoardValueInfos[];
};

const EditvaluesDialogContent: React.FC<EditvaluesDialogContentProps> = ({
    onClose, onSubmit, board, boardInfos, fetchNameSearch, hideNameAndId
}) => {

    const getEmptyAllInfos = (): NormalizeObject<InputBoardValueInfos> => ({
        0: {
            id: 0,
            board,
            name: '- new -',
            oldValueList: [],
            history: []
        }
    });

    const getInitialAllInfos = (): NormalizeObject<InputBoardValueInfos> => boardInfos.length
        ? boardInfos.reduce<NormalizeObject<InputBoardValueInfos>>((acc, v) => {
            acc[ v.id ] = v;
            return acc;
        }, {})
        : getEmptyAllInfos();

    const [ allInfos, setAllInfos ] = React.useState(getInitialAllInfos());
    const infosIds = Object.keys(allInfos).map(k => +k);

    const hasValues = !!infosIds.length;

    const onSubmitFull = () => onSubmit(allInfos);

    const [ currentId, setCurrentId ] = React.useState(infosIds[ 0 ] ?? 0);

    const currentInfos = allInfos[ currentId ];

    const canAdd = !allInfos[ 0 ];

    const canSubmit = canAdd;

    const canDelete = infosIds.length > 1 || infosIds[ 0 ] !== 0;

    return <>
        <DialogTitle>
            <div>
                {enumToString.boardKind(board)} - Edit values
            </div>

            <Grid container alignItems='center' xs={12}>
                <Grid item xs style={{ overflow: 'hidden' }}>
                    <Tabs
                        variant='scrollable'
                        indicatorColor="primary"
                        textColor="primary"
                        value={currentId}
                        onChange={(e, v) => setCurrentId(v)}
                    >
                        {infosIds.map(id => <Tab key={id} value={id} label={allInfos[ id ].name} />)}
                    </Tabs>
                </Grid>
                <Grid item>
                    <UIMenuIcon>
                        {closeMenu => (
                            <>
                                <MenuItem
                                    onClick={() => {
                                        setAllInfos(allInfos => ({
                                            ...allInfos,
                                            ...getEmptyAllInfos()
                                        }));
                                        setCurrentId(0);
                                        closeMenu();
                                    }}
                                    disabled={!canAdd}
                                >
                                    <ListItemIcon>
                                        <AddBoxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Add new' />
                                </MenuItem>

                                <MenuItem
                                    onClick={() => {
                                        setAllInfos(allInfos => {
                                            if (infosIds.length === 1) {
                                                return getEmptyAllInfos();
                                            }
                                            const newInfos = { ...allInfos };
                                            delete newInfos[ currentId ];
                                            return newInfos;
                                        });
                                        setCurrentId(infosIds.find(id => id !== currentId) ?? 0);
                                        closeMenu();
                                    }}
                                    disabled={!canDelete}
                                >
                                    <ListItemIcon>
                                        <DeleteIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Delete' />
                                </MenuItem>
                            </>
                        )}
                    </UIMenuIcon>
                </Grid>
            </Grid>
        </DialogTitle>
        <DialogContent>
            {hasValues && <EditValuesLine
                key={currentId}
                hideNameAndId={hideNameAndId}
                infos={currentInfos}
                onChange={item => {

                    setAllInfos(prevAllInfos => {
                        const { id } = currentInfos;

                        const allInfos = { ...prevAllInfos };
                        if (item.id !== id) {

                            if (allInfos[ item.id ] && item.name !== allInfos[ item.id ].name) {
                                return prevAllInfos;
                            }

                            delete allInfos[ id ];

                            setCurrentId(item.id);
                        }

                        return ({
                            ...allInfos,
                            [ item.id ]: item
                        });
                    });
                }}
                fetchNameSearch={fetchNameSearch}
            />}

        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>
                Cancel
  </Button>
            <Button
                onClick={onSubmitFull}
                color="primary"
                disabled={!canSubmit}
            >
                Submit
  </Button>
        </DialogActions>
    </>;
};
