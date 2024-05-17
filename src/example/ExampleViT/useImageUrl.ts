import imgsrc from "/vit/example_0_0.jpg?url";

const imgdir = imgsrc.split("/").slice(0, -1).join("/");

export default (n: number, m: number) => {
    return `${imgdir}/example_${n}_${m}.jpg`;
};