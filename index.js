const babelPluginSyntaxJsx = require('@babel/plugin-transform-react-jsx').default;

function findPropDeclarations(path) {
  return path.node.body
    .filter(node => (
        node.type === 'ExportNamedDeclaration'
        && node.declaration.type === 'VariableDeclaration'
        && node.declaration.kind === 'let'
    ))
    .flatMap(node => {
      return node.declaration.declarations.map(declaration => {
        return [declaration.id, declaration.init];
      })
    })
}

function findDisplayName(path) {
  for (let node of path.node.body) {
    if (
      node.type === 'ExportNamedDeclaration'
      && node.declaration.type === 'VariableDeclaration'
    ) {
      for (let declaration of node.declaration.declarations) {
        if (declaration.id.name === 'displayName') {
          // TODO: Throw if declaration.init.value is not string literal
          return declaration.init.value;
        }
      }
    }
  }

  // TODO: Parse file name otherwise
  return 'Component';
}

module.exports = function BabelPluginRkx(babel) {
  const types = babel.types;
  return {
    inherits: babelPluginSyntaxJsx,
    visitor: {
      Program(path) {
        if (typeof path.node.loc.filename === 'string' && !path.node.loc.filename.includes('.react.')) {
          return;
        }
        const propEntries = findPropDeclarations(path);
        const displayName = findDisplayName(path);
        path.replaceWith(
          types.program([
            ...path.node.body.filter(node => node.type === 'ImportDeclaration'),
            types.exportDefaultDeclaration(
              types.functionDeclaration(
                types.identifier(displayName),
                [
                  types.objectPattern(
                    propEntries.map(([id, value]) => {
                      return types.objectProperty(
                        id,
                        types.assignmentPattern(id, value),
                      );
                    })
                  ),
                ],
                types.blockStatement(
                  path.node.body
                    .filter(node => !['ExportNamedDeclaration', 'ImportDeclaration'].includes(node.type))
                    .map((node, index, arr) => {
                      if(index === arr.length - 1) {
                        return types.returnStatement(node.expression)
                      }
                      return node;
                    })
                )
              )
            )
          ])
        );
        path.skip();
      },
    },
  };
}