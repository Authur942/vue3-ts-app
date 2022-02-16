class Storage {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public get(key: string | undefined) {
    if (!key) { return }
    const text = localStorage.getItem(key)
    try {
      if (text) {
        return JSON.parse(text)
      }else {
        localStorage.removeItem(key)
        return null
      }
    } catch {
      localStorage.removeItem(key)
      return null
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public set(key: string | undefined, data: any) {
    if (!key) {
      return 
    }
    localStorage.setItem(key, JSON.stringify(data))
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public remove(key: string | undefined) {
    if (!key) {
      return
    }
    localStorage.removeItem(key)
  }
}

export default Storage