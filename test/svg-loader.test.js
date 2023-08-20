import webpack from "webpack";
import MemoryFs from "memory-fs";

function compile(rules) {
  const compiler = webpack({
    mode: "development",
    context: __dirname,
    entry: "./fixtures/test.svg",
    output: {
      path: __dirname,
      filename: "bundle.js",
    },
    module: { rules },
  });

  compiler.outputFileSystem = new MemoryFs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      else {
        resolve(
          stats
            ?.toJson({ source: true })
            ?.modules?.find(({ name }) => name === "./fixtures/test.svg")
            ?.source
        );
      }
    });
  });
}

it("converts svg to compionent", async () => {
  const source = await compile([
    {
      test: /\.svg$/,
      use: ["babel-loader", require.resolve("../index.js")],
    },
    {
      test: /\.(ts|js)x?$/,
      use: ["babel-loader"],
    },
  ]);

  expect(source).toMatchSnapshot();
});

it("sets currentColor option", async () => {
  const source = await compile([
    {
      test: /\.svg$/,
      use: [
        "babel-loader",
        {
          loader: require.resolve("../index.js"),
          options: {
            applyCurrentColor: true,
          },
        },
      ],
    },
    {
      test: /\.(ts|js)x?$/,
      use: ["babel-loader"],
    },
  ]);

  expect(source).toMatchSnapshot();
});

it("returns image with data url base64", async () => {
  const source = await compile([
    {
      test: /\.svg$/,
      use: [
        "babel-loader",
        {
          loader: require.resolve("../index.js"),
          options: {
            transformIntoDataURI: true,
          },
        },
      ],
    },
    {
      test: /\.(ts|js)x?$/,
      use: ["babel-loader"],
    },
  ]);

  expect(source).toMatchSnapshot();
});
