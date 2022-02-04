const { JSDOM } = require("jsdom");

// importing like that breaks the engines, because `hast-util-from-dom` has different exports structure for CommonJS
// (https://www.runpkg.com/?hast-util-from-dom@3.0.0/dist/hast-util-from-dom.js#125 ) versus ES Modules
// (https://www.runpkg.com/?hast-util-from-dom@3.0.0/dist/hast-util-from-dom.mjs#117 )
const fromDom = require("hast-util-from-dom");

// using `preferDefault` is current workaround
// const preferDefault = (m) => (m && m.default) || m;
// const fromDom = preferDefault(require("hast-util-from-dom")))

console.log({ fromDom });

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    Query: {
      jsdom: {
        type: `String`,
        resolve: () => {
          const test = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
          console.log({ test });
          // fromDom throws that it's not a function because it's wrapped module
          // { default: [Function] }
          const tree = fromDom(test.window.document.body.firstChild);

          console.log({ tree });
        },
      },
    },
  });
};
