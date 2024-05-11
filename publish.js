import ghpages from "gh-pages";

ghpages.publish("dist", (err) => {
    if (err) console.warn(err);
});