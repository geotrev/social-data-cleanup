/**
  * Page:
  * - reddit.com/user/<USERNAME>/comments
  * - reddit.com/user/<USERNAME>/submitted
  * Run from: Dev tools console
  */

async function wait() {
  return new Promise((done) =>
    setTimeout(() => requestAnimationFrame(done), 500)
  );
}

function queryEntries() {
	return [...document.querySelectorAll('[data-oc]'), ...document.querySelectorAll('[data-type="comment"]')]
}

async function exec() {
	const entries = queryEntries()

	if (entries.length) {
		console.log("🧹 Deleting comments...")
		
		for (const entry of entries) {
			const btn = entry.querySelector('.del-button .option.error .yes')
			btn.click()

			await wait()
		}	
	}
	
	if (queryEntries().length > 0) {
		console.log("🧲 There are more comments to delete")
		return exec()
	}

	console.log("✨ Done")
}

exec()
