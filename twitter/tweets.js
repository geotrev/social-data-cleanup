/**
  * Pages:
  * - twitter.com/<user_handle>/
  * - twitter.com/<user_handle>/with_replies
  *
  * Runs from: Dev tools console
  */

/**
  * Specify your Twitter handle:
  */
let TWITTER_HANDLE = "@TWITTER_HANDLE"

/**
  * Timing can sometimes be sensitive on lower end PCs/Macs. If that's the case, increase this number in increments of 100 until the script is stable.
  *
  * NOTE: 500 = 500 milliseconds = 0.5 seconds
  */
let INTERACTION_DELAY = 500

async function wait() {
  return new Promise((done) =>
    setTimeout(() => requestAnimationFrame(done), INTERACTION_DELAY)
  );
}

function queryCells() {
  return [...document.querySelectorAll('[data-testid="tweet"]')];
}

async function exec(cells = []) {
  let cells = cells.length ? cells : queryCells();
  console.log("🧹 Deleting tweets");

  for (const cell of cells) {
    let cellContainer = cell.closest('[data-testid="cellInnerDiv"]')
    let isSelfTweet = !!cell.querySelector('[data-testid="User-Name"]')?.innerText.includes(TWITTER_HANDLE)
    let isRetweet = !!cell.querySelector('[data-testid="socialContext"]');
    let overflowBtn = cell.querySelector('[data-testid="caret"]');

    if (isRetweet) {
      let untweetBtn = cell.querySelector('[data-testid="unretweet"]');
      untweetBtn.click();
      await wait();

      let undoBtn = document.querySelector(
        '[data-testid="Dropdown"] > [data-testid="unretweetConfirm"]'
      );
      undoBtn.click();

     untweetBtn = undefined
     undoBtn = undefined
    } else {
      if (!isSelfTweet) continue

      overflowBtn.click();
      await wait();

      // first menu item is the "delete" button
      let deleteBtn = document.querySelector(
        '[data-testid="Dropdown"] > [role="menuitem"]'
      );

      deleteBtn.click();
     
      await wait();

      let confirmDialogBtn = document.querySelector(
        '[data-testid="confirmationSheetDialog"] [data-testid="confirmationSheetConfirm"]'
      );
      confirmDialogBtn.click();

      await wait()

      // Cleanup all tweets above the removed tweet.
      // Unfortunately Twitter doesn't automatically purge these. :/
      let timelineCells = [...cellContainer.parentNode.children]
      let cellIndex = timelineCells.indexOf(cellContainer)
      timelineCells.slice(0, cellIndex).forEach(child => child.parentNode.removeChild(child))
    
     deleteBtn = undefined
     confirmDialogBtn = undefined
     timelineCells = undefined
     cellIndex = undefined
    }

    cellContainer = undefined
    isSelfTweet = undefined
    isRetweet = undefined
    overflowBtn = undefined

    await wait();
  }

  cells = queryCells();

  if (cells.length) {
    console.log("🧲 There are more tweets to delete");
    return exec(cells);
  }

  console.log("✨ Done!");
}

exec()
