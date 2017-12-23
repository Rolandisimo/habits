// @ts-check

export const periods = [
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

/**
 * 
 * @param {number} periodTimeframe 
 * @returns {number}
 */
export function getSelectedPeriod(periodTimeframe) {
    if (!periodTimeframe) {
        // Will select 0 index in <RadioForm/>
        return 0;
    }

    let selectedPeriod;
    periods.forEach((period, i) => {
        if (period.value === periodTimeframe) {
            selectedPeriod = i;
        };
    });
    return selectedPeriod;
};
