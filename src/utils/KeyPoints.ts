import { KeyPoints2Dictionary } from "@/components/modules/getModulePosition";

export default (el: any) => {
    if (el == undefined) return {};
    return KeyPoints2Dictionary(el.keypoints ?? []);
};