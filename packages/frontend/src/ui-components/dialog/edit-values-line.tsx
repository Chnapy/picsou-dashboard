import { CircularProgress, Divider, Grid, IconButton } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBoxSharp';
import DeleteIcon from '@material-ui/icons/DeleteSharp';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { UITextField } from '../text-field/ui-text-field';
import { UITypography } from '../typography/ui-typography';
import { EditSearchData, InputBoardValueInfos } from './edit-values-dialog';

export type EditValuesLineProps = {
    infos: InputBoardValueInfos;
    onChange: (infos: InputBoardValueInfos) => void;
    fetchNameSearch?: (search: string) => Promise<EditSearchData[]>;
    hideNameAndId?: boolean;
};

export const EditValuesLine: React.FC<EditValuesLineProps> = ({
    infos, onChange, fetchNameSearch, hideNameAndId
}) => {
    const getEmptyOldValue = () => ({
        oldValue: 0,
        quantity: 0
    });

    const oldValueList = infos.oldValueList.length
        ? infos.oldValueList
        : [ getEmptyOldValue() ]

    const [ open, setOpen ] = React.useState(false);
    const [ loading, setLoading ] = React.useState(false);
    const [ search, setSearch ] = React.useState(infos.name);
    const [ id, setId ] = React.useState(infos.id);
    const [ options, setOptions ] = React.useState<EditSearchData[]>([]);

    const currentSearch = React.useRef(infos.name);

    const canSearch = (searchValue: string) => fetchNameSearch && searchValue.length >= 3;

    React.useEffect(() => {
        let active = true;

        if (!canSearch(search)) {
            return;
        }

        setLoading(true);

        const fetchFn = async () => {
            if (currentSearch.current === search) {
                return;
            }
            currentSearch.current = search;

            const data = await fetchNameSearch!(search);

            if (active) {
                setOptions(data);

                await fetchFn();
            }
        };

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        fetchFn()
            .then(() => setLoading(false));

        return () => {
            active = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ search ]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [ open ]);

    return <Grid container spacing={2}>

        {!hideNameAndId && <>

            <Grid item xs={12} sm={4}>
                <UITextField
                    label='Id'
                    type='number'
                    value={id}
                    required
                    onChange={e => setId(+e.currentTarget.value)}
                    onBlur={e => {
                        onChange({
                            ...infos,
                            id: +e.currentTarget.value
                        });
                    }}
                />
            </Grid>

            <Grid item xs={12} sm={8}>

                <Autocomplete<EditSearchData, undefined, undefined, boolean>
                    open={canSearch(search) && open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    freeSolo
                    selectOnFocus
                    size='small'
                    value={{ name: search, id }}
                    onChange={(e, option, reason) => {
                        if (option && typeof option === 'object') {
                            setSearch(option.name);
                            setId(option.id);
                            onChange({
                                ...infos,
                                id: option.id,
                                name: option.name
                            });
                        }
                        if (reason !== 'blur') {
                            // setLoading(false);
                        }
                    }}
                    inputValue={search}
                    onInputChange={(e, newInputValue) => {
                        setSearch(newInputValue);
                        if (canSearch(newInputValue)) {
                            // setLoading(true);
                        }
                    }}
                    onBlur={e => onChange({
                        ...infos,
                        name: search
                    })}
                    getOptionSelected={(option, value) => option.id === value.id}
                    getOptionLabel={(option) => option.name}
                    options={options}
                    loading={loading}
                    renderInput={(params) => (
                        <UITextField
                            {...params}
                            label='Name'
                            required
                            autoFocus
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading ? <CircularProgress color="inherit" size={20} style={{
                                            alignSelf: 'flex-start',
                                            marginTop: -2,
                                        }} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    )}
                    renderOption={({ name, extra, secondary }) => {

                        return (
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs>
                                    <UITypography variant='body1'>
                                        {name}
                                    </UITypography>

                                    <UITypography variant="body2">
                                        {secondary}
                                    </UITypography>
                                </Grid>
                                <Grid item>
                                    <UITypography variant="body1">
                                        {extra}
                                    </UITypography>
                                </Grid>
                            </Grid>
                        );
                    }}
                />
            </Grid>
        </>}

        {oldValueList.map(({ oldValue, quantity }, i) => (
            <React.Fragment key={i}>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item container xs={12} wrap='nowrap' alignItems='center' spacing={1}>
                    <Grid item xs={6} sm>
                        <UITextField
                            label='Value'
                            type='number'
                            defaultValue={oldValue}
                            required
                            onBlur={e => {
                                const oldValues = [ ...oldValueList ];
                                oldValues[ i ] = {
                                    ...oldValues[ i ],
                                    oldValue: +e.currentTarget.value,
                                };

                                onChange({
                                    ...infos,
                                    oldValueList: oldValues
                                });
                            }}
                        />
                    </Grid>
                    <Grid item xs sm={4}>
                        <UITextField
                            label='Quantity'
                            type='number'
                            defaultValue={quantity}
                            required
                            onBlur={e => {
                                const oldValues = [ ...oldValueList ];
                                oldValues[ i ] = {
                                    ...oldValues[ i ],
                                    quantity: +e.currentTarget.value,
                                };

                                onChange({
                                    ...infos,
                                    oldValueList: oldValues
                                });
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <IconButton
                            size='small'
                            onClick={() => onChange({
                                ...infos,
                                oldValueList: oldValueList.filter((v, index) => index !== i)
                            })}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </React.Fragment>
        ))}

        <Grid item xs={12}>
            <Divider />
        </Grid>

        <Grid item container xs={12} justify='flex-end'>
            <IconButton
                onClick={() => onChange({
                    ...infos,
                    oldValueList: [
                        ...oldValueList,
                        getEmptyOldValue()
                    ]
                })}>
                <AddBoxIcon />
            </IconButton>
        </Grid>

    </Grid >;
};
