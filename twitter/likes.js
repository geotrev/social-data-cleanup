/**
  * Pages:
  * - twitter.com/<user_handle>/likes
  *
  * Runs from: Dev tools console
  */

(async function exec(_cells = []) {
  /**
    * Timing can sometimes be sensitive on lower end PCs/Macs. If that's the case, increase this number in increments of 100 until the script is stable.
    *
    * NOTE: 500 = 500 milliseconds = 0.5 seconds
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
 
  let cells = _cells.length ? _cells : queryCells();
  console.log("🧹 Removing likes...");

  for (const cell of cells) {
    let cellContainer = cell.closest('[data-testid="cellInnerDiv"]')
    let unlikeBtn = cell.querySelector('[data-testid="unlike"]');

    if (unlikeBtn) {
      unlikeBtn.click();
      await wait()
    }
    
    cellContainer.parentNode.removeChild(cellContainer) 

    cellContainer = undefined
    unlikeBtn = undefined
   
    await wait();
  }

  cells = queryCells();
  DELETE_DELAY = undefined

  if (cells.length) {
     console.log("🧲 There are more likes to remove");
     return exec(cells);
  } else {
    console.log("✨ Done!");
  }
})()
