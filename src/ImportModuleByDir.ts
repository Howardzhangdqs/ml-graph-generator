import { markRaw, defineAsyncComponent, ref } from "vue";


function GetComponentList(files: Record<string, any>) {
    const filesNameList = [];

    for (const key in files) {
        const fileName = key.replace(/(\.\/|\.vue)/g, "");
        filesNameList.push(fileName);
    }

    const allComps = markRaw(filesNameList);

    const componentList = ref<{
        FileName: string,
        component: any,
    }[]>([]);

    allComps.map((v) => {
        const item = {
            FileName: "",
            component: null,
        };

        item.FileName = v;

        item.component = markRaw(defineAsyncComponent(
            () => import(/* @vite-ignore */ `./${v}.vue`)
        ));

        componentList.value.push(item);
    });

    return componentList;
}

export default GetComponentList;