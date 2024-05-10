import md5 from "md5";

const doms = new Map<string, HTMLDivElement[]>();

const SameWidth = (el: HTMLDivElement, { value }: { value: string }) => {
    const hash = md5(value);

    // 如果当前dom是最宽的，更新所有dom宽度
    const updateWidth = (doms: HTMLDivElement[]) => {
        let maxWidth = 0;
        
        doms.forEach((dom) => {
            const width = dom.offsetWidth;
            if (width > maxWidth) {
                maxWidth = width;
            }
        });

        doms.forEach((dom) => {
            dom.style.width = maxWidth + "px";
        });
    };

    if (doms.has(hash)) {
        (doms.get(hash) as HTMLDivElement[]).push(el);
        updateWidth(doms.get(hash) as HTMLDivElement[]);
    } else {
        doms.set(hash, [el]);
    }
};

export default {
    mounted: SameWidth
};
