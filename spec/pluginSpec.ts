import * as shell from 'shelljs';

describe('plugin ', () => {
  it('should enforce events annotated with @name where typedoc dont do that', () => {
    shell.rm('-rf', 'test/node_modules', 'test/out', 'test/ast.json', 'test/package-lock.json');
    shell.cp('-r', 'test' ,'newProject');
    shell.cd('newProject');
    expect(shell.exec('npm install').code).toBe(0);
    expect(shell.exec('npm remove typedoc-plugin-respect-name-tag').code).toBe(0);
    expect(shell.exec('npm install').code).toBe(0);
    expect(shell.exec('node -p require("typedoc-plugin-respect-name-tag")').code).not.toBe(0);
    expect(shell.exec('node node_modules/typedoc/bin/typedoc --out out --json ast-without.json sample1.ts').code).toBe(0);

    expect(shell.exec('npm i typedoc-plugin-respect-name-tag').code).toBe(0);
    expect(shell.exec('node -p require("typedoc-plugin-respect-name-tag")').code).toBe(0);
    expect(shell.exec('node node_modules/typedoc/bin/typedoc --plugin typedoc-plugin-respect-name-tag --out out --json ast-with.json sample1.ts').code).toBe(0);

    const astWithout = shell.cat('ast-without.json').toString();
    const astWith = shell.cat('ast-with.json').toString();

    expect(astWithout).not.toContain('"name": "before:add-to-cart"');
    expect(astWith).toContain('"name": "before:add-to-cart"');

    expect(timesInside('"name": "addListener",', astWithout)).toBe(4);
    expect(timesInside('"name": "addListener",', astWith)).toBe(2);

  });
});


function timesInside(s1:string, s2:string):number {
  return s2.split(s1).length - 1;
}
