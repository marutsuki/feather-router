import { ExtractPathParams, PathElements } from "../src/types";

const PathWithOneElement: PathElements<"/profile"> = ["profile"];
console.log(PathWithOneElement);

const PathWithOneElementParam: PathElements<"/:id"> = [":id"];
console.log(PathWithOneElementParam);

const PathWithParams: PathElements<"/products/:category/:productId"> = [
  "products",
  ":category",
  ":productId",
];
console.log(PathWithParams);

/**
 * These values should not have compiler errors.
 */
const OneParam: ExtractPathParams<"/dashboard/:id"> = {
  id: "1",
};
console.log(OneParam);

const TwoParams: ExtractPathParams<"/dashboard/:id/:sid"> = {
  id: "1",
  sid: "2",
};
console.log(TwoParams);

const ParamsInTheMiddle: ExtractPathParams<"/profile/:id/dashboard"> = {
  id: "1",
};
console.log(ParamsInTheMiddle);

const ParamsAtTheStart: ExtractPathParams<"/:id/profile/dashboard"> = {
  id: "1",
};
console.log(ParamsAtTheStart);
