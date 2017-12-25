export interface Period {
    label: string;
    value: number;
}

export const periods: Period[] = [
    {
        label: "3 weeks",
        value: 1814000000,
    },
    {
        label: "1 month",
        value: 2629746000,
    },
    {
        label: "3 months",
        value: 7889238000,
    },
    {
        label: "6 months",
        value: 15778476000,
    },
];

export function getSelectedPeriod(periodTimeframe: number): number {
    // Will select 0 index in <RadioForm/>
    let selectedPeriod = 0;
    if (!periodTimeframe) {
        return selectedPeriod;
    }

    periods.forEach((period, i) => {
        if (period.value === periodTimeframe) {
            selectedPeriod = i;
        };
    });

    return selectedPeriod;
};
