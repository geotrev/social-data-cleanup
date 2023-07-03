# social-data-cleanup

A collection of scripts to delete your social media data. Each script specifies its target page within the script file in a header comment.

WARNING: Although the scripts are tested and safe as of the last date of their commit (check commit date by browsing into the corresponding website folder), please note they are **destructive** and will permanently alter the state of your social media data. There are no filters to white list specific items, or date limits. 

## Twitter

Alls cripts are dependent on the `[data-testid]` attribute (in most cases) on page elements, so if those go away anytime in the future, this script won't work. It runs no truthy heuristics, so the scripts will immediately fail if any query selectors return null.

## Reddit

### REQUIRED:
- You must use old.reddit.com for this script. Change it in your user preferences, near the bottom.
- You must be on the desktop site.

### RECOMMENDED:
- Install [RES](https://redditenhancementsuite.com/) to make this process the least painful. It will automatically load in more posts/comments as they are removed.
