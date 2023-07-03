/**
  * Page: reddit.com/user/<USERNAME>/saved
  * Run from: Dev tools console
  */

async function wait(ms = 100) {
  return new Promise((done) =>
    setTimeout(() => requestAnimationFrame(done), ms)
  );
}

function queryEntries() {
	return [...document.querySelectorAll('[data-oc]')]
}

async function exec() {
	const entries = queryEntries()

	if (entries.length) {
		console.log("🧹 Deleting saved items...")

		for (const entry of entries) {
			const saveBtn = entry.querySelector('.save-button > a')

			if (saveBtn.innerText === 'unsave') {
				btn.click()
				await wait(250)
			}

			entry.parentNode.removeChild(entry)
			await wait()
		}
	}

	if (queryEntries().length > 0) {
		console.log("🧲 There are more saved posts/comments to remove")
		return exec()
	}

	console.log("✨ Done")
}

exec()
