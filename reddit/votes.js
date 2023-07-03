/**
  * Page:
  * - reddit.com/user/<USERNAME>/upvoted
  * - reddit.com/user/<USERNAME>/downvoted
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
	const container = document.getElementById("siteTable")
	const entries = queryEntries()
	
	if (entries.length) {
		console.log("🧹 Removing votes...")
		
		for (const entry of entries) {
			if (entry.querySelector('.archived')) {
				entry.parentNode.removeChild(entry)
			} else {
				const btn = entry.querySelector('.upmod') || entry.querySelector('.downmod')	
				btn.click()
				await wait(250)

				entry.parentNode.removeChild(entry)
			}
			
			await wait()
		}	
	}
	
	const moreEntries = queryEntries()
	
	if (moreEntries.length > 0) {
		console.log("🧲 There are more posts to unvote");
		return exec();
	}
	
	console.log("✨ Done")
}

exec()
