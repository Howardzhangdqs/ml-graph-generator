import { KeyPoints2Dictionary } from "@/components/modules/getModulePosition";

export default (el: any) =>
    KeyPoints2Dictionary(el.value?.keypoints ?? []);