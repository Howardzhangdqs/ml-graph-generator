import ghpages from "gh-pages";

ghpages.publish("dist", (err) => {
    console.warn(err);
});