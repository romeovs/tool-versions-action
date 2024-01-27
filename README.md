# @romeovs/tool-versions-action

## Usage

Add a step to you workflow to read the versions from `.tool-versions`:

```yaml
- name: Read .tool-versions
  uses: romeovs/tool-versions-action@v1
  id: versions
```

Then, use the outputs of that step, for example:

```yaml
- uses: pnpm/action-setup@v2
  name: Install pnpm
  with:
    version: ${{ steps.versions.outputs.pnpm }}
```

### Inputs

- `path`: path of the `.tool-versions` file, defaults to `.tool-versions`

### Outputs

This action creates one output per entry in the `.tool-versions` file, containing
the version.

## Example workflow

```yaml
name: Get version info
on: push
jobs:
  build:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v3
    - name: Read .tool-versions
      uses: romeovs/tool-versions-action@v1
      id: versions
    - uses: pnpm/action-setup@v2
      name: Install pnpm ${{ steps.versions.outputs.pnpm }}
      with:
        version: ${{ steps.versions.outputs.pnpm }}
    - name: Use Node.js ${{ steps.versions.outputs.nodejs}}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ steps.versions.outputs.nodejs}}
```

## License

The scripts and documentation in this project are released under the MIT License.
