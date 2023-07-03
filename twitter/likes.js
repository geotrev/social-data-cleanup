/**
  * Page: twitter.com/<user_handle>/likes
  * Runs from: Dev tools console
  */

let DELETE_DELAY = 150

async function wait() {
  return new Promise((done) =>
    setTimeout(() => requestAnimationFrame(done), DELETE_DELAY)
  );
}

function queryCells() {
  return [...document.querySelectorAll('[data-testid="tweet"]')];
}

async function exec() {
  const cells = queryCells();
  console.log("🧹 Removing likes...");

  for (const cell of cells) {
    const cellContainer = cell.closest('[data-testid="cellInnerDiv"]')
    const unlikeBtn = cell.querySelector('[data-testid="unlike"]');

    if (unlikeBtn) {
        unlikeBtn.click();
        await wait()
    }
    
    cellContainer.parentNode.removeChild(cellContainer)

    await wait();
  }

  const moreCells = queryCells();

  if (moreCells.length) {
    console.log("🧲 There are more likes to remove");
    return exec();
  }

  console.log("✨ Done!");
}

exec()
