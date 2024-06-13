
export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP'
    }).format(value);
}

export const toBoolean = (str: string) => {
    return str.toLocaleLowerCase() === "true"
}