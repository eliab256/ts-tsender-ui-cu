

export function calculateTotal(amounts: string): number {
    const amountArray = amounts
        .split(/[\n,]+/) 
        .map((amt) => amt.trim())
        .filter((amt) => amt !== "") // Remove empty strings
        .map(amt => parseFloat(amt));
    
    return amountArray.filter(num => !isNaN(num)).reduce((sum, num) => sum + num, 0) // Filter out NaN values

}