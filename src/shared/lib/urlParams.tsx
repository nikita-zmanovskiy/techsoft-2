class UrlParams {
    private params: URLSearchParams | null = null
 
    get(key: string) {
        this.params = new URLSearchParams(window.location.search)
        return this.params.get(key)
    }
    set(key: string, value: string | null) {
        this.params = new URLSearchParams(window.location.search)

        if(value) {
            this.params.set(key, value)
        } else {
            this.params.delete(key)
        }
        const newUrl:string = `${window.location.pathname}?${this.params}`
        window.history.replaceState({}, '', newUrl)
        return newUrl

    }
}
export default UrlParams