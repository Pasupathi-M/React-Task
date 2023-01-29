
export const getDateTime = (options?: any) => {
    return new Date().toLocaleString("en-US",{
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    })  
}