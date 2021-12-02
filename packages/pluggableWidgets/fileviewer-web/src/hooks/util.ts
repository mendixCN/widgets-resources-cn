function getEnclosingWidget(registry: any, ele: any) {
    const objs: any = [];
    const pendingDataView = [];
    let stop = false;
    while (!stop) {
        if (ele.parentElement.classList.contains("mx-dataview")) {
            pendingDataView.push(ele.parentElement.classList[1].slice(8));
        }

        if (
            ele.parentElement.childElementCount > 1 &&
            ele.parentElement.lastElementChild != null &&
            ele.parentElement.lastElementChild.getAttribute("widgetid")
        ) {
            console.log(ele.parentElement.lastElementChild.getAttribute("widgetid"));
            console.log(ele.parentElement.lastElementChild.getAttribute("data-mendix-id"));

            const w1 = registry.byId(ele.parentElement.lastElementChild.getAttribute("widgetid"));
            let pre = ele.parentElement.lastElementChild
                .getAttribute("data-mendix-id")
                .split(".")
                .slice(0, -1)
                .join(".");

            pendingDataView.forEach(dv => {
                //@ts-ignore
                if (mx.version.split(".")[0] === "9") {
                    // objs.push(w1._storeBackend.get$(`${pre}.${dv}`, `object`, "*;"));
                    objs.push(w1._storeBackend.recordGroups.get(`object»${pre}.${dv}`));
                }
                //@ts-ignore
                else if (mx.version.split(".")[0] === "8") {
                    const oi = w1._store.entries[`{"widgetId":"${pre}.${dv}","slot":"object"}`].get$();
                    objs.push(oi);
                } else {
                }
            });
        }
        if (ele.parentElement.getAttribute("widgetid")) {
            debugger;
            console.log(ele.parentElement.getAttribute("widgetid"));
            console.log(ele.parentElement.getAttribute("data-mendix-id"));
        }
        ele = ele.parentElement;

        if (ele.getAttribute("data-mx-placeholder")) {
            stop = true;
        }
    }
    return objs;
}

export default (ele: any, cb: (objs: any[]) => void) => {
    //@ts-ignore
    window.require(["dijit/registry"], (registry: any) => {
        cb(getEnclosingWidget(registry, ele));
    });
};
