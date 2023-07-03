# social-data-cleanup

A collection of scripts to delete your social media data. Each script specifies its target page within the script file in a header comment.

To use a script, open dev tools (CMD/CTRL + i) in your browser (Chromium preferred) and past the script in. Press enter to run it.

_WARNING: Although the scripts are tested and safe as of the last date of their commit (check commit date by browsing into the corresponding website folder), please note they are **destructive** and will permanently alter the state of your social media data. There are no filters to white list specific items, or date limits._

## Twitter

Alls cripts are dependent on the `[data-testid]` attribute (in most cases) on page elements, so if those go away anytime in the future, this script won't work. It runs no truthy heuristics, so the scripts will immediately fail if any query selectors return null.

## Reddit

### Required:
- You must use old.reddit.com for this script. Change it in your user preferences, near the bottom.
- You must be on the desktop site.

### Recommended:
- Install [RES](https://redditenhancementsuite.com/) to make this process the least painful. It will automatically load in more posts/comments as they are removed.
