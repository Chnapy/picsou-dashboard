import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Tab, Tabs } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { BoardKind, BoardValueInfos } from '@picsou/shared';
import React from 'react';
import { enumToString } from '../../util/enum-to-string';
import { NormalizeObject } from '../../util/normalize';
import { EditValuesLine } from './edit-values-line';

export type InputBoardValueInfos = Omit<BoardValueInfos, 'currentValue'>;

export type EditSearchData = Pick<InputBoardValueInfos, 'id' | 'name'> & {
    extra?: string;
    secondary?: string;
};

export type EditValuesDialogProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: NormalizeObject<InputBoardValueInfos>) => Promise<void>;
    board: BoardKind;
    boardInfos: InputBoardValueInfos[];
    fetchNameSearch?: (search: string) => Promise<EditSearchData[]>;
};

// TODO different form for each board kind (id/name)

export const EditValuesDialog: React.FC<EditValuesDialogProps> = ({ open, onClose, onSubmit, board, boardInfos, fetchNameSearch }) => {

    const [ allInfos, setAllInfos ] = React.useState(
        boardInfos.reduce<NormalizeObject<InputBoardValueInfos>>((acc, v) => {
            acc[ v.id ] = v;
            return acc;
        }, {})
    );
    const infosIds = Object.keys(allInfos).map(k => +k);

    const hasValues = !!infosIds.length;

    const onSubmitFull = () => onSubmit(allInfos);

    const [ currentId, setCurrentId ] = React.useState(infosIds[ 0 ] ?? 0);

    const currentInfos = allInfos[ currentId ];

    const canAdd = !allInfos[ 0 ];

    const canSubmit = canAdd;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm' PaperProps={{ elevation: 4 }}>
            <DialogTitle>
                <div>
                    {enumToString.boardKind(board)} - Edit values
                    </div>

                <Grid container xs={12}>
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
                        <IconButton
                            onClick={() => {
                                setAllInfos(allInfos => ({
                                    ...allInfos,
                                    0: {
                                        id: 0,
                                        board,
                                        name: '-new-',
                                        oldValueList: [],
                                        quantityUnit: 'unit',
                                    }
                                }));
                                setCurrentId(0);
                            }}
                            disabled={!canAdd}
                        >
                            <AddBoxIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                {hasValues && <EditValuesLine
                    key={currentId}
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
        </Dialog>
    );
};
