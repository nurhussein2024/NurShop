export const formatPrice = (price) => {
    return new Intl.NumberFormat('sv-SE', { 
        style: 'currency',
        currency: "SEK" // har jag anvant en svensk krona till hela app 
    }).format(price);
}
