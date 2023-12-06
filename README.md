# social-data-cleanup

A collection of scripts to delete your social media data. 

## About

The scripts in this repository run in real time, on a browser page you are logged into. In this way they are essentially automated scripts.

**None of these scripts store, process, or send any data to a third party (or me).** Please view the scripts for yourself - they are written to be as plain and junior dev friendly as possible. Doing so ensures they aren't blockable unless a website somehow figures out how to block browser dev tools. :)

## Usage

Navigate to a script you would like to use. For example: `Twitter` > `Likes`. Copy the script by selecting the "Raw" button near the top right of the code panel, and selecting the full result on the opened page/tab. Go to the corresponding page on Twitter (specified in the script at the top), then paste it into dev tools console.

Finally, add any optional required variable data to execute it correctly (e.g., username).

_WARNING: Although the scripts are tested and safe as of the last date of their commit (check commit date by browsing into the corresponding folder), please note they are **destructive** and will permanently alter the state of your social media data. There are no filters to white list specific items, or date limits. If this is something you want to do, open your saved items separately so you can re-save/like them later._

### Twitter

All scripts are dependent on the `[data-testid]` attribute (in most cases) on page elements, so if those go away anytime in the future, this script won't work. It runs purely on truthy heuristics, so the scripts will skip mismatched page elements and continue their loops.

### Reddit

#### Required:
- You must use `https://old.reddit.com`. Navigate to that URL while logged in or opt out of the reddit redesign in preferences.
- You must be on the desktop site.
- Install [RES](https://redditenhancementsuite.com/) to make this process the least painful. It will automatically load in more posts/comments so the loop may continue checking & deleting data seamlessly.

## Future planning

I'll move this to Tampermonkey eventually to make it simpler to use (ideally with hot keys or a button in a popover).
