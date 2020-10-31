import { MainBoardState } from '../main-board/reducer/main-board-reducer';

export const getVisitFakeMainBoardData = (): Pick<MainBoardState, 'values' | 'valuesList' | 'status'> => {

    return {
        values: {
            '3851': {
                board: 'cash',
                currentValue: 2164.21,
                id: 3851,
                name: 'Compte d\'épargne',
                oldValueList: [
                    {
                        oldValue: 2164.21,
                        quantity: 1
                    }
                ],
                history: []
            },
            '5381': {
                board: 'cash',
                currentValue: 14891.31,
                id: 5381,
                name: 'PEL',
                oldValueList: [
                    {
                        oldValue: 14891.31,
                        quantity: 1
                    }
                ],
                history: []
            },
            '997026': {
                board: 'market',
                currentValue: 159.66,
                id: 997026,
                name: 'Lyxor Euro Stoxx 300 DR UCITS C',
                oldValueList: [
                    {
                        oldValue: 173.83,
                        quantity: 6
                    }
                ],
                history: []
            },
            '997053': {
                board: 'market',
                currentValue: 14.6,
                id: 997053,
                name: 'Lyxor PEA MSCI Emerging Markets UCITS C',
                oldValueList: [
                    {
                        oldValue: 14.568,
                        quantity: 32
                    }
                ],
                history: []
            },
            '997057': {
                board: 'market',
                currentValue: 17.87,
                id: 997057,
                name: 'Lyxor PEA MSCI World UCITS C',
                oldValueList: [
                    {
                        oldValue: 19.078,
                        quantity: 24
                    }
                ],
                history: []
            },
            '997058': {
                board: 'market',
                currentValue: 37.6,
                id: 997058,
                name: 'Lyxor PEA Nasdaq 100 UCITS C',
                oldValueList: [
                    {
                        oldValue: 40.798,
                        quantity: 36
                    }
                ],
                history: []
            },
            '1155481': {
                board: 'market',
                currentValue: 32.18,
                id: 1155481,
                name: 'La Francaise Des Jeux Sa',
                oldValueList: [
                    {
                        oldValue: 0,
                        quantity: 0
                    }
                ],
                history: []
            },
            '704271126': {
                board: 'cash',
                currentValue: 22950,
                id: 704271126,
                name: 'LIVRET A',
                oldValueList: [
                    {
                        oldValue: 22950,
                        quantity: 1
                    }
                ],
                history: []
            },
            '1223007322': {
                board: 'cash',
                currentValue: 10,
                id: 1223007322,
                name: 'LIVRET B',
                oldValueList: [
                    {
                        oldValue: 10,
                        quantity: 1
                    }
                ],
                history: []
            },
            '4192453871': {
                board: 'cash',
                currentValue: 1492.08,
                id: 4192453871,
                name: 'CPT DEPOT PART.',
                oldValueList: [
                    {
                        oldValue: 6078.25,
                        quantity: 1
                    }
                ],
                history: []
            },
            '11193481112': {
                board: 'cash',
                currentValue: 15300,
                id: 11193481112,
                name: 'LEL',
                oldValueList: [
                    {
                        oldValue: 11310.27,
                        quantity: 1
                    }
                ],
                history: []
            },
            '6163835900': {
                board: 'cash',
                currentValue: 12000,
                id: 6163835900,
                name: 'LDD Solidaire',
                oldValueList: [
                    {
                        oldValue: 12000,
                        quantity: 1
                    }
                ],
                history: []
            },
            '-1': {
                board: 'gold',
                currentValue: 51863.58,
                id: -1,
                name: 'Gold',
                oldValueList: [
                    {
                        oldValue: 47200,
                        quantity: 0.21
                    },
                    {
                        oldValue: 47000,
                        quantity: 0.106
                    },
                    {
                        oldValue: 47260,
                        quantity: 0.209
                    },
                    {
                        oldValue: 47200,
                        quantity: 0.042
                    }
                ],
                history: []
            }
        },
        valuesList: {
            cash: [
                3851,
                5381,
                704271126,
                1223007322,
                4192453871,
                11193481112,
                6163835900
            ],
            gold: [
                -1
            ],
            market: [
                997026,
                997053,
                997057,
                997058,
                1155481
            ]
        },
        status: {
            cash: {
                loading: false,
                lastHistoryFetchTimes: {}
            },
            gold: {
                loading: false,
                lastHistoryFetchTimes: {}
            },
            market: {
                loading: false,
                lastHistoryFetchTimes: {}
            },
        }
    };
};
