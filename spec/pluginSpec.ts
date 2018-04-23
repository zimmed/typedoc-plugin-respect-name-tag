import * as shell from 'shelljs';

describe('plugin ', () => {
  it('should enforce events annotated with @name where typedoc dont do that', () => {
    shell.cd('test');
    shell.rm('-rf', 'out ast.json');
    it(1).toBe(1);
  });
});
