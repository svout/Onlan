export function setSitename(sitename: string | undefined) {
    if (!sitename) return;
    document.title = sitename;
}
