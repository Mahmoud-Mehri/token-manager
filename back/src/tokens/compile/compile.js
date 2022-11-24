const path = require("path");
const fs = require("fs");
const solc = require("solc");

export const ContractType = {
  FT: 1,
  NFT: 2,
  MT: 3,
};

// returns absolute path of a relative one using the parent path
const buildFullPath = (parent, filePath) => {
  let curDir = parent.substr(0, parent.lastIndexOf("/")); //i.e. ./node/.../ERC721
  const backSteps = filePath.substr(0, filePath.lastIndexOf("./") + 1);
  curDir = path.resolve(curDir, backSteps);
  if (filePath.startsWith("./")) {
    return curDir + "/" + filePath.substr(2);
  }

  while (filePath.startsWith("../")) {
    filePath = filePath.substr(3);
  }

  return curDir + "/" + filePath;
};

// returns all the import paths in absolute path
const getNeededImports = (path) => {
  const file = fs.readFileSync(path, "utf8");
  const files = new Array();
  file
    .toString()
    .split("\n")
    .forEach(function (line, index, arr) {
      if (
        (index === arr.length - 1 && line === "") ||
        !line.trim().startsWith("import")
      ) {
        return;
      }
      // the import is legit
      const relativePath = line.substring(8, line.length - 2);
      const fullPath = buildFullPath(path, relativePath);
      files.push(fullPath);
    });

  return files;
};

// using recursion
const compileImports = (rootName, rootAddr, sources) => {
  sources[rootAddr] = { content: fs.readFileSync(rootAddr, "utf8") };
  const imports = getNeededImports(rootAddr);
  for (let i = 0; i < imports.length; i++) {
    compileImports(imports[i], imports[i], sources);
  }
};

function compile(filename) {
  const fName = filename.split(".")[0];

  const inputFileAddr = path.resolve(
    __dirname,
    "../contracts/",
    `${fName}.sol`
  );
  const outputFileAddr = path.resolve(
    __dirname,
    "../contracts/",
    `${fName}-data.json`
  );

  const sources = {};
  compileImports(fName, inputFileAddr, sources);
  // const source = fs.readFileSync(inputFileAddr, "utf-8");
  // delete sources["ft"];

  const input = {
    language: "Solidity",
    sources: sources,
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input)));

  const result = {
    abi: output.contracts[`${inputFileAddr}`].FungibleToken.abi,
    bytecode:
      output.contracts[`${inputFileAddr}`].FungibleToken.evm.bytecode.object,
  };

  fs.writeFile(outputFileAddr, JSON.stringify(result), (err) => {
    if (err) {
      console.log(
        `Error on saving compiled file { ${inputFileAddr} }:\n${err.message}`
      );
    }
  });

  return result;
}

export const getContractData = (type) => {
  let fileName = "";
  let fileAddr = "";
  switch (type) {
    case ContractType.FT: {
      fileName = "ft.sol";
      fileAddr = path.resolve(__dirname, "../contracts/", "ft-data.json");
      break;
    }
    case ContractType.NFT: {
      fileName = "nft.sol";
      fileAddr = path.resolve(__dirname, "../contracts/", "nft-data.json");
      break;
    }
    case ContractType.MT: {
      fileName = "mt.sol";
      fileAddr = path.resolve(__dirname, "../contracts/", "mt-data.json");
      break;
    }
  }

  if (fileName == "") return null;

  try {
    if (fs.existsSync(fileAddr)) {
      const content = fs.readFileSync(fileAddr);

      return JSON.parse(content);
    } else {
      return compile(fileName);
    }
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return null;
  }
};
