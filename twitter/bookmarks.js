/**
  * Page: twitter.com/i/bookmarks
  * Run from: Dev tools console
  */

async function wait(ms = 500) {
  return new Promise((done) =>
    setTimeout(() => requestAnimationFrame(done), ms)
  );
}

function queryCells() {
  return [...document.querySelectorAll('[data-testid="tweet"]')];
}

async function exec() {
  const cells = queryCells();
  console.log("🧹 Deleting tweets");

  for (const cell of cells) {
    const shareBtn = cell.querySelector('[aria-label="Share Tweet"]');

    shareBtn.click();
    await wait();

    const unbookmarkItem = document.querySelector(
      '[data-testid="Dropdown"] > [role="menuitem"]:last-child'
    );

    unbookmarkItem.click();
    await wait();
  }

  const moreCells = queryCells();

  if (moreCells.length) {
    console.log("🧲 There are more tweets to delete");
    return exec();
  }

  console.log("✨ Done!");
}

exec()
