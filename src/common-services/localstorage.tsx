<></>

export const retrieve = (keyString: string): string | null  => {
    return localStorage.getItem(keyString)
}

export const add = (keyString: string, value: string | any) => {
    localStorage.setItem(keyString, value)
}

export const remove = (keyString: string) => {
    localStorage.removeItem(keyString)
}

export const clean = () => {
    localStorage.clear()
}
    