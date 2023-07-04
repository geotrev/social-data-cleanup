/**
  * Pages:
  * - twitter.com/<user_handle>/
  * - twitter.com/<user_handle>/with_replies
  * Runs from: Dev tools console
  */

let TWITTER_HANDLE = "@TWITTER_HANDLE"
let INTERACTION_DELAY = 500

async function wait() {
  return new Promise((done) =>
    setTimeout(() => requestAnimationFrame(done), INTERACTION_DELAY)
  );
}

function queryCells() {
  return [...document.querySelectorAll('[data-testid="tweet"]')];
}

async function exec() {
  const cells = queryCells();
  console.log("🧹 Deleting tweets");

  for (const cell of cells) {
    const cellContainer = cell.closest('[data-testid="cellInnerDiv"]')
    const isSelfTweet = !!cell.querySelector('[data-testid="User-Name"]')?.innerText.includes(TWITTER_HANDLE)
    const isRetweet = !!cell.querySelector('[data-testid="socialContext"]');
    const overflowBtn = cell.querySelector('[data-testid="caret"]');

    if (isRetweet) {
      const untweetBtn = cell.querySelector('[data-testid="unretweet"]');
      untweetBtn.click();
      await wait();

      const undoBtn = document.querySelector(
        '[data-testid="Dropdown"] > [data-testid="unretweetConfirm"]'
      );
      undoBtn.click();
    } else {
      if (!isSelfTweet) continue

      overflowBtn.click();
      await wait();

      // first menu item is the "delete" button
      const deleteBtn = document.querySelector(
        '[data-testid="Dropdown"] > [role="menuitem"]'
      );

      deleteBtn.click();
      await wait();

      const confirmDialogBtn = document.querySelector(
        '[data-testid="confirmationSheetDialog"] [data-testid="confirmationSheetConfirm"]'
      );
      confirmDialogBtn.click();

      await wait()

      // Cleanup all tweets above the removed tweet.
      // Unfortunately Twitter doesn't automatically purge these. :/
      const timelineCells = [...cellContainer.parentNode.children]
      const cellIndex = timelineCells.indexOf(cellContainer)
      timelineCells.slice(0, cellIndex).forEach(child => child.parentNode.removeChild(child))
    }

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
