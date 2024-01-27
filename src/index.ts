import { promises as fs } from "fs"
import * as core from "@actions/core"

try {
	await run()
} catch (err) {
	if (err instanceof Error) {
		core.setFailed(err.message)
	} else {
		throw err
	}
}

async function run() {
	const path = core.getInput("path") || ".tool-versions"

	core.debug(`Loading versions from ${path}`)
	const tools = await read(path)

	for (const tool of tools) {
		core.debug(`version for ${tool.name}: ${tool.version}`)
		core.setOutput(tool.name, tool.version)
	}
}

type Tool = {
	name: string
	version: string
}

async function read(path: string): Promise<Tool[]> {
	const content = await fs.readFile(path, "utf-8")
	return content
		.split("\n")
		.map(function (line) {
			if (line.trim() === "") {
				return null
			}
			const [name, version] = line.trim().split(/\s+/)
			if (!name || !version) {
				throw new Error(`Cannot parse line in ${path}: ${line}`)
			}
			return {
				name: name.trim(),
				version: version.trim(),
			}
		})
		.filter((x): x is Tool => x !== null)
}
