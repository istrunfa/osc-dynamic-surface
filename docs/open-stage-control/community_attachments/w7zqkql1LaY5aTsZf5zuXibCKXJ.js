var oscHost = '127.0.0.1';
var oscPort = '8080';

// Variables for Selector Module
var selectorArea = 2;       //  "Selection": 1, "Region": 2
var selectorType = 1;       //  "Note": 1
var selectorSubType = 1;    //  "All": 1, "Rhythm": 2;
var selectorRhythm = 1;     //  "1": 1, "2": 2, "3": 3, "4": 4

// Variables for Transpose Module
var transposeInterval = 0;
var transposeCopy = false;

// Variables for Nudge Module
var nudgeSelection = 0;
var nudgeNoteStart = false;
var nudgeNoteEnd = false;

// Variables for Tap2Tempo Module
const MIN_BPM = 40
var tapDurations, tapIndex, lastTapTime = 0, maxTapLength = 1000 * 60 / MIN_BPM


colors = {
    short: '#aaaaaa',
    long: '#aaaaaa',
    deco: '#121212',
    legato: '#aaaaaa',
}

bgcolors = {
    short: '#800000',
    long: '#000080',
    deco: '#ab9a29',
    legato: '#000060',
}

// articulations details that will be used to create buttons 
var articulations = {
    // 0      
    'Staccato': { type: 'short', colors: 'short', prg: '1' },
    'Staccato muted': { type: 'short', colors: 'short', prg: '2' },
    'Detache': { type: 'short', colors: 'short', prg: '3' },
    'Detache muted': { type: 'short', colors: 'short', prg: '4' },
    'Sustain': { type: 'long', colors: 'long', prg: '5' },
    'Sustain muted': { type: 'long', colors: 'long', prg: '6' },
    'Marcato': { type: 'long', colors: 'long', prg: '7' },
    'Marcato muted': { type: 'long', colors: 'long', prg: '8' },
    'XF Tremolo': { type: 'long', colors: 'long', prg: '9' },
    'XF Tremolo muted': { type: 'long', colors: 'long', prg: '10' },
    // 11
    'Legato': { type: 'legato', colors: 'legato', prg: '11' }, //, icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGimlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTExLTI2VDE1OjUzOjUzKzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTExLTI2VDE1OjUzOjUzKzAxOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0xMS0yNlQxNTo1Mzo1MyswMTowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpmMDJiMjAxOC0zMDUwLWRhNDAtOTVlNy1hOGE3NDg4YTgyNjQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1NTlkZTA1My02YWU5LTQ3NDAtOTdmNi1mMTNlMzQwNWE4ZmIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkZTNmNGRkOS1jOTUxLTQxNDQtOTNjYi02ZDJkNTFmYTM0M2IiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmRlM2Y0ZGQ5LWM5NTEtNDE0NC05M2NiLTZkMmQ1MWZhMzQzYiIgc3RFdnQ6d2hlbj0iMjAxOC0xMS0yNlQxNTo1Mzo1MyswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpmMDJiMjAxOC0zMDUwLWRhNDAtOTVlNy1hOGE3NDg4YTgyNjQiIHN0RXZ0OndoZW49IjIwMTgtMTEtMjZUMTU6NTM6NTMrMDE6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPHJkZjpCYWc+IDxyZGY6bGk+eG1wLmRpZDpkYzA3Y2RhNC0yNTIzLWNkNGUtYTE0OC1kZjU4NDVmNzdiMTU8L3JkZjpsaT4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7uwWwiAAAF/ElEQVR4nO2dWWhcVRiAv8kmxtjGpri00eAWa2vd0YoUt4C04IIKgogb+qAi4gLiiwouD/Wl6oOC4IutCiIUF9RoxaUPtWBdStWAWJoGlWoxVmLTtHp9+Cd2Umcmd+49y535/w8OJGHmvz/3fnPuuef8c1JKkgRDL22xEzDiYgIoxwRQjgmgHBNAOSaAckwA5ZgAyjEBlGMCKMcEUI4JoJyOkAcrlUohD9cMfAhcVv55f5IknaETsB4gLh01fg6GCaAcE0A5JoByTADlmADKMQGUYwIoxwRQjgmgHBNAOSaAckwA5ZgAymkFARYC4xXtiYi5NB1RliAd0wnMrfi9J1YizUgr9ABGDkwA5ZgAyjEBlGMCKMcEUI4JoBwTQDkmgHJMAOWYAMoxAZRjAijHBFCOCaAcE0A5JoByTADlmADKMQGUYwIoxwRQjgmgHBNAOSaAckwA5ZgAyjEBlGMCKMcEUI4JoBwTQDkmgHJMAOWYAMoxAZRjAiinFXYJKypHAecCxwPzy3/7BdgKbAL2RsprBiaAW/qB24DrgKV1XrcbWAt0hUiqHiaAG44FHgduBNpTvH4OcCfwt8+k0mAC5KMNuA+5+IdmeH8aWbxiAmTnCOBV4PLYieTBBMhGPzAMnBo7kbyYAI0zD/gAWBQ7ERfYPEBjtAOv0yIXH0yARrkfuNRT7N88xa2LCZCeY4DHPMb/2WPsmpgA6XkQ6PYY/yuPsWtiAqSjA7jZ8zHe9Ry/KiZAOs4D+jzG3wWs8xi/JiZAOurN67tgFbDH8zGqYgKk42iPsUeAZzzGr0szTAT1A2cg/x2sG1lG3QZsBnYGysHXp3MSuIGIS8NFFeAc4CbgKmCgzus+A14OkM+Ih5j/IAPLzR5ipydJkmAtBcuBj4EkR1vt9AQJc4C/cuZV2fYjS8czCHktpltRxgB9SIHEp8BFkXOpxm7geUexfgdWAmscxctFEQS4APgGuRcWmUeQPPMwjIxnhvOn44bYAlwJfAQscBjT17hmAhgCNmR471bgWqR2YIfLpHITcQywApjC3X11uq3zesLkQ3MH8O0seYwj3fwQUEoTOMYYoJRycOaEUum/87AIqYw93MNhNiCDyRCcgswSHof8D+O9wBiwpdwaqvkLeS2mifEY2IGUUvm4+CDdbShG8POIGIwYY4C7gDM9xt/iMXbLEVqALuBhz8cwARogtABX4Hde/Q9go8f4LUdoAVZ6jr8GebIoGiWKOcEVXICzPcaeQpZVi8YC4D3k0bBwhBbAZ1HFKmDUY/wsXIOMSUaRae7iEXgi6EfcT/wkyJxCZ7CTNjs9wEtIbtuQxaRZ0bAY9IOHmGPIsvE+D7GzsBz4GrgVyel6ZDGpkIQW4H3H8bYDlxCppPogeoBngU+AE8p/uwfpnYpL4FtAL7Ic6qLb34jbRaQ8rEC6+lx1CTFuAaEFABkY5S2meJICbK6A7AvwBv/P8TUy9K5aBAAp95qscuLSrPQtyXChXHMY8CiyRHxwjm+SUU5NAgAMIp+UfVVOYmUbQ6pmT8tyUh3TAdyOjDmq5foKOXqmGALEWg6uZB4yS7aEA5spjSP31E3A98SfROlCCjgfAk6s8ZrVwANIsWcmQl6LGQeN1AM0A3ORLWBGqd1DTSH7/eRG2y2gyCwGngP+pP7taTuwzNVBTYC4HAncC3xBugHpWuSx1hkxBCjqF0NCcTJSmHo1cCHpavd2AHcDb/lLKxyaBGhDnjyWAReX20AD758AnibiFzl90IoCdCIzhCchxaeDwFnl1pMh3gTwIvAU8KujHAtD0QUYQBZVupGvZk3TjhSVdiMj9V7kEXIhci9PVYY9C6PIhX+BSPv3hKAI8wCz0QvcgtTiL3aYTjV2AW8jA7z15Himz0KMgXIzCFDJUmQtYQg4n/w1AJPI0u164B3gcyLu32sCNMYhwOmIFIPIPgLzkaqjPg4sxuwpt53ItPJPSF3Cl8B3yOJSIWh5AYziEfvLoUZkTADlmADKMQGUYwIoxwRQjgmgHBNAOSaAckwA5ZgAyjEBlPMvRA0LoMz09aoAAAAASUVORK5CYII='
    'Legato muted': { type: 'legato', colors: 'legato', prg: '12' },
    'Portamento': { type: 'legato', colors: 'legato', prg: '13' },
    'Portamento muted': { type: 'legato', colors: 'legato', prg: '14' },
    'Sforzato': { type: 'deco', colors: 'deco', prg: '15' },
    'Sforzato muted': { type: 'deco', colors: 'deco', prg: '16' },
    'Sforzato XF Tremolo': { type: 'deco', colors: 'deco', prg: '17' },
    'Sforzato XF Tremolo muted': { type: 'deco', colors: 'deco', prg: '18' },
    'Tremolo': { type: 'deco', colors: 'deco', prg: '19' },
    'Tremolo muted': { type: 'deco', colors: 'deco', prg: '20' },
    // 21
    'Tremolo Marcato': { type: 'deco', colors: 'deco', prg: '21' },
    'Tremolo Marcato muted': { type: 'deco', colors: 'deco', prg: '22' },
    'Pizzicato': { type: 'short', colors: 'short', prg: '23' },
    'Pizzicato muted': { type: 'short', colors: 'short', prg: '24' },
    'Legato Auto-Speed': { type: 'legato', colors: 'legato', prg: '25' },
    'Legato Repetitions': { type: 'legato', colors: 'legato', prg: '26' },
    'Flutter': { type: 'long', colors: 'long', prg: '27' },
    'Repetitions': { type: 'short', colors: 'short', prg: '28' },
    'Trill': { type: 'deco', colors: 'deco', prg: '29' },
    'Cluster': { type: 'deco', colors: 'deco', prg: '30' },
    // 31
    'Staccatissimo': { type: 'short', colors: 'short', prg: '31' },
    'Sustain Cantabile': { type: 'long', colors: 'long', prg: '32' },
    'Sustain Soft': { type: 'long', colors: 'long', prg: '33' },
    'Flautando': { type: 'long', colors: 'long', prg: '34' },
    'Legato Cantabile': { type: 'legato', colors: 'legato', prg: '35' },
    'Legato Soft': { type: 'legato', colors: 'legato', prg: '36' },
    'Legato Marcato': { type: 'legato', colors: 'legato', prg: '37' },
    'Legato Fast': { type: 'legato', colors: 'legato', prg: '38' },
    'Legato Fast Marcato': { type: 'legato', colors: 'legato', prg: '39' },
    'Legato Slur': { type: 'legato', colors: 'legato', prg: '40' },
    // 41
    'Fortepiano': { type: 'long', colors: 'long', prg: '41' },
    'Crescendo': { type: 'long', colors: 'long', prg: '42' },
    'Diminuendo': { type: 'long', colors: 'long', prg: '43' },
    'Snap Pizzicato': { type: 'short', colors: 'short', prg: '44' },
    'Col Legno': { type: 'short', colors: 'short', prg: '45' },
}

// mapping between the daw's track identifiers and the articulation's labels
var tracks = {
    0: { 'trackname': 'Track not configured in OSC', 'trackarticulations': [] },
    1: { 'trackname': 'VSL - Synchron Strings - 1st Violins', 'trackarticulations': ['Staccato', 'Staccatissimo', 'Sustain Cantabile', 'Sustain Soft', 'Sustain', 'Marcato', 'Flautando', 'Legato Cantabile', 'Legato Soft', 'Legato', 'Legato Marcato', 'Legato Fast', 'Legato Fast Marcato', 'Legato Slur', 'Legato Auto-Speed', 'Sforzato', 'Fortepiano', 'Crescendo', 'Diminuendo', 'Tremolo', 'Tremolo Marcato', 'Pizzicato', 'Snap Pizzicato'] },
    2: { 'trackname': 'VSL - Synchron Strings - 2nd Violins', 'trackarticulations': ['Staccato', 'Staccatissimo', 'Sustain Cantabile', 'Sustain Soft', 'Sustain', 'Marcato', 'Flautando', 'Legato Cantabile', 'Legato Soft', 'Legato', 'Legato Marcato', 'Legato Fast', 'Legato Fast Marcato', 'Legato Slur', 'Legato Auto-Speed', 'Sforzato', 'Fortepiano', 'Crescendo', 'Diminuendo', 'Tremolo', 'Tremolo Marcato', 'Pizzicato', 'Snap Pizzicato'] },
    3: { 'trackname': 'VSL - Synchron Strings - Violas', 'trackarticulations': ['Staccato', 'Staccatissimo', 'Sustain Cantabile', 'Sustain Soft', 'Sustain', 'Marcato', 'Flautando', 'Legato Cantabile', 'Legato Soft', 'Legato', 'Legato Marcato', 'Legato Fast', 'Legato Fast Marcato', 'Legato Slur', 'Legato Auto-Speed', 'Sforzato', 'Fortepiano', 'Crescendo', 'Diminuendo', 'Tremolo', 'Tremolo Marcato', 'Pizzicato', 'Snap Pizzicato'] },
    4: { 'trackname': 'VSL - Synchron Strings - Cellos', 'trackarticulations': [] },
    5: { 'trackname': 'VSL - Synchron Strings - Double Basses', 'trackarticulations': [] },
    6: { 'trackname': 'VSL - Synchron Strings - Full Ensemble', 'trackarticulations': [] },
    7: { 'trackname': 'VSL - Synchron Pianos - Yamaha CFX', 'trackarticulations': [] },
    8: { 'trackname': 'VSL - Synchron Pianos - Blüthner 1895', 'trackarticulations': [] },
    9: { 'trackname': '-', 'trackarticulations': [] },
    10: { 'trackname': '-', 'trackarticulations': [] },
    11: { 'trackname': 'VSL - Dimension Strings - 1st Violins', 'trackarticulations': ['Staccato', 'Staccato muted', 'Detache', 'Detache muted', 'Sustain', 'Sustain muted', 'Marcato', 'Marcato muted', 'XF Tremolo', 'XF Tremolo muted', 'Legato', 'Legato muted', 'Portamento', 'Portamento muted', 'Sforzato', 'Sforzato muted', 'Sforzato XF Tremolo', 'Sforzato XF Tremolo muted', 'Tremolo', 'Tremolo muted', 'Tremolo Marcato', 'Tremolo Marcato muted', 'Pizzicato', 'Pizzicato muted'] },
    12: { 'trackname': 'VSL - Dimension Strings - 2nd Violins', 'trackarticulations': ['Staccato', 'Staccato muted', 'Detache', 'Detache muted', 'Sustain', 'Sustain muted', 'Marcato', 'Marcato muted', 'XF Tremolo', 'XF Tremolo muted', 'Legato', 'Legato muted', 'Portamento', 'Portamento muted', 'Sforzato', 'Sforzato muted', 'Sforzato XF Tremolo', 'Sforzato XF Tremolo muted', 'Tremolo', 'Tremolo muted', 'Tremolo Marcato', 'Tremolo Marcato muted', 'Pizzicato', 'Pizzicato muted'] },
    13: { 'trackname': 'VSL - Dimension Strings - Violas', 'trackarticulations': ['Staccato', 'Staccato muted', 'Detache', 'Detache muted', 'Sustain', 'Sustain muted', 'Marcato', 'Marcato muted', 'XF Tremolo', 'XF Tremolo muted', 'Legato', 'Legato muted', 'Portamento', 'Portamento muted', 'Sforzato', 'Sforzato muted', 'Sforzato XF Tremolo', 'Sforzato XF Tremolo muted', 'Tremolo', 'Tremolo muted', 'Tremolo Marcato', 'Tremolo Marcato muted', 'Pizzicato', 'Pizzicato muted'] },
    14: { 'trackname': 'VSL - Dimension Strings - Cellos', 'trackarticulations': ['Staccato', 'Staccato muted', 'Detache', 'Detache muted', 'Sustain', 'Sustain muted', 'Marcato', 'Marcato muted', 'XF Tremolo', 'XF Tremolo muted', 'Legato', 'Legato muted', 'Portamento', 'Portamento muted', 'Sforzato', 'Sforzato muted', 'Sforzato XF Tremolo', 'Sforzato XF Tremolo muted', 'Tremolo', 'Tremolo muted', 'Tremolo Marcato', 'Tremolo Marcato muted', 'Pizzicato', 'Pizzicato muted'] },
    15: { 'trackname': 'VSL - Dimension Strings - Double Basses', 'trackarticulations': ['Staccato', 'Staccato muted', 'Detache', 'Detache muted', 'Sustain', 'Sustain muted', 'Marcato', 'Marcato muted', 'XF Tremolo', 'XF Tremolo muted', 'Legato', 'Legato muted', 'Portamento', 'Portamento muted', 'Sforzato', 'Sforzato muted', 'Sforzato XF Tremolo', 'Sforzato XF Tremolo muted', 'Tremolo', 'Tremolo muted', 'Tremolo Marcato', 'Tremolo Marcato muted', 'Pizzicato', 'Pizzicato muted'] },
    16: { 'trackname': 'VSL - Dimension Brass - Horns', 'trackarticulations': ['Staccato', 'Staccato muted', 'Sustain', 'Sustain muted', 'Marcato', 'Marcato muted', 'Legato', 'Legato muted', 'Sforzato', 'Sforzato muted'] },
    17: { 'trackname': 'VSL - Dimension Brass - Trumpets', 'trackarticulations': ['Staccato', 'Staccato muted', 'Sustain', 'Sustain muted', 'Marcato', 'Marcato muted', 'Legato', 'Legato muted', 'Sforzato', 'Sforzato muted'] },
    18: { 'trackname': 'VSL - Dimension Brass - Trombones', 'trackarticulations': ['Staccato', 'Staccato muted', 'Sustain', 'Sustain muted', 'Marcato', 'Marcato muted', 'Legato', 'Legato muted', 'Sforzato', 'Sforzato muted'] },
    19: { 'trackname': 'VSL - Dimension Brass - Wagner Tubas', 'trackarticulations': ['Staccato', 'Sustain', 'Marcato', 'Legato', 'Sforzato'] },
    20: { 'trackname': 'VSL - Dimension Brass - Low Brass', 'trackarticulations': ['Staccato', 'Sustain', 'Marcato', 'Legato', 'Sforzato'] },
    21: { 'trackname': 'Toontrack - Superior Drummer - Orchestral Percussions I', 'trackarticulations': [] },
    22: { 'trackname': 'Toontrack - Superior Drummer - Orchestral Percussions II', 'trackarticulations': [] },
    23: { 'trackname': 'Toontrack - Superior Drummer - Core Library', 'trackarticulations': [] },
    24: { 'trackname': 'VSL - Appassionata Strings - 1st Violins', 'trackarticulations': ['Sustain', 'Staccato', 'Detache', 'Legato', 'Fortepiano', 'Sforzato', 'Tremolo', 'Pizzicato', 'Marcato', 'Col Legno', 'Portamento', 'Trill'] },
    25: { 'trackname': 'VSL - Appassionata Strings - 2nd Violins', 'trackarticulations': ['Sustain', 'Staccato', 'Detache', 'Legato', 'Fortepiano', 'Sforzato', 'Tremolo', 'Pizzicato', 'Marcato', 'Col Legno', 'Portamento', 'Trill'] },
    26: { 'trackname': 'VSL - Appassionata Strings - Violas', 'trackarticulations': ['Sustain', 'Staccato', 'Detache', 'Legato', 'Fortepiano', 'Sforzato', 'Tremolo', 'Pizzicato', 'Marcato', 'Col Legno', 'Portamento', 'Trill'] },
    27: { 'trackname': 'VSL - Appassionata Strings - Cellos', 'trackarticulations': ['Sustain', 'Staccato', 'Detache', 'Legato', 'Fortepiano', 'Sforzato', 'Tremolo', 'Pizzicato', 'Marcato', 'Col Legno', 'Portamento', 'Trill'] },
    28: { 'trackname': 'VSL - Appassionata Strings - Double Basses', 'trackarticulations': ['Sustain', 'Staccato', 'Detache', 'Legato', 'Fortepiano', 'Sforzato', 'Tremolo', 'Pizzicato', 'Marcato', 'Col Legno', 'Portamento', 'Trill'] },
    29: { 'trackname': 'VSL - Appassionata Strings - Full Ensemble', 'trackarticulations': [] },
    30: { 'trackname': 'VSL - Brass - Piccolo Trumpet', 'trackarticulations': ['Staccato', 'Sforzato', 'Legato', 'Legato Auto-Speed', 'Legato Repetitions', 'Sustain', 'Flutter', 'Repetitions', 'Trill'] },
    31: { 'trackname': 'VSL - Brass - Trumpet C', 'trackarticulations': ['Staccato', 'Sforzato', 'Legato', 'Legato Auto-Speed', 'Legato Repetitions', 'Sustain', 'Flutter', 'Repetitions', 'Trill'] },
    32: { 'trackname': 'VSL - Brass - Trumpet Ensemble', 'trackarticulations': ['Staccato', 'Sforzato', 'Legato', 'Legato Auto-Speed', 'Legato Repetitions', 'Sustain', 'Flutter', 'Repetitions'] },
    33: { 'trackname': 'VSL - Brass - Bass Trumpet', 'trackarticulations': ['Staccato', 'Sforzato', 'Legato', 'Legato Auto-Speed', 'Legato Repetitions', 'Sustain', 'Flutter', 'Repetitions', 'Trill'] },
    34: { 'trackname': 'VSL - Brass - Horn Ensemble (3 Player)', 'trackarticulations': ['Staccato', 'Sforzato', 'Legato', 'Legato Auto-Speed', 'Legato Repetitions', 'Sustain', 'Flutter', 'Repetitions'] },
    35: { 'trackname': 'VSL - Brass - Horn Ensemble (8 Player)', 'trackarticulations': ['Staccato', 'Sforzato', 'Legato', 'Legato Auto-Speed', 'Legato Repetitions', 'Sustain', 'Flutter', 'Repetitions', 'Trill'] },
    36: { 'trackname': 'VSL - Brass - Tenor Trombone', 'trackarticulations': ['Staccato', 'Sforzato', 'Legato', 'Legato Auto-Speed', 'Legato Repetitions', 'Sustain', 'Flutter', 'Repetitions'] },
    37: { 'trackname': 'VSL - Brass - Trombone Ensemble', 'trackarticulations': ['Staccato', 'Sforzato', 'Legato', 'Legato Auto-Speed', 'Legato Repetitions', 'Sustain', 'Flutter', 'Repetitions'] },
    38: { 'trackname': 'VSL - Brass - Bass Trombone', 'trackarticulations': ['Staccato', 'Sforzato', 'Legato', 'Legato Auto-Speed', 'Legato Repetitions', 'Sustain', 'Flutter', 'Repetitions'] },
    39: { 'trackname': 'VSL - Brass - Contrabass Trombone', 'trackarticulations': ['Staccato', 'Sforzato', 'Legato', 'Legato Auto-Speed', 'Legato Repetitions', 'Sustain', 'Flutter'] },
    40: { 'trackname': 'VSL - Brass - Cimbasso', 'trackarticulations': ['Staccato', 'Sforzato', 'Legato', 'Legato Auto-Speed', 'Legato Repetitions', 'Sustain', 'Flutter'] },
    41: { 'trackname': 'VSL - Brass - Bass Tuba', 'trackarticulations': ['Staccato', 'Sforzato', 'Legato', 'Legato Auto-Speed', 'Legato Repetitions', 'Sustain', 'Flutter', 'Repetitions', 'Trill'] },
    42: { 'trackname': 'VSL - Brass - Contrabass Tuba', 'trackarticulations': ['Staccato', 'Sforzato', 'Legato', 'Legato Auto-Speed', 'Legato Repetitions', 'Sustain', 'Flutter', 'Trill'] },
    43: { 'trackname': 'VSL - Brass - Wagner Tuba', 'trackarticulations': ['Staccato', 'Sforzato', 'Legato', 'Legato Auto-Speed', 'Legato Repetitions', 'Sustain', 'Flutter'] },
    50: { 'trackname': 'VSL - Woodwinds - Flute', 'trackarticulations': ['Staccato', 'Sforzato', 'Legato', 'Legato Auto-Speed', 'Legato Repetitions', 'Sustain', 'Flutter', 'Repetitions', 'Trill'] },
    51: { 'trackname': 'VSL - Woodwinds - Flute Ensemble', 'trackarticulations': ['Staccato', 'Sforzato', 'Legato', 'Legato Auto-Speed', 'Legato Repetitions', 'Sustain', 'Cluster', 'Trill'] },
    52: { 'trackname': 'VSL - Woodwinds - Alto Flute', 'trackarticulations': ['Staccato', 'Sforzato', 'Legato', 'Legato Auto-Speed', 'Legato Repetitions', 'Sustain', 'Flutter', 'Trill'] },
    53: { 'trackname': 'VSL - Woodwinds - Oboe (French)', 'trackarticulations': ['Staccato', 'Sforzato', 'Legato', 'Legato Auto-Speed', 'Legato Repetitions', 'Sustain', 'Flutter', 'Trill'] },
    54: { 'trackname': '-', 'trackarticulations': [] },
    55: { 'trackname': 'VSL - Woodwinds - Obeo Ensemble', 'trackarticulations': ['Staccato', 'Sforzato', 'Legato', 'Legato Auto-Speed', 'Legato Repetitions', 'Sustain', 'Cluster', 'Trill'] },
    56: { 'trackname': 'VSL - Woodwinds - Clarinet Bb', 'trackarticulations': ['Staccato', 'Sforzato', 'Legato', 'Legato Auto-Speed', 'Legato Repetitions', 'Sustain', 'Flutter', 'Repetitions', 'Trill'] },
    57: { 'trackname': 'VSL - Woodwinds - Clarinet Ensemble', 'trackarticulations': ['Staccato', 'Sforzato', 'Legato', 'Legato Auto-Speed', 'Legato Repetitions', 'Sustain', 'Cluster', 'Trill'] },
    58: { 'trackname': 'VSL - Woodwinds - Bassoon', 'trackarticulations': ['Staccato', 'Sforzato', 'Legato', 'Legato Auto-Speed', 'Legato Repetitions', 'Sustain', 'Flutter', 'Repetitions', 'Trill'] },
    59: { 'trackname': 'VSL - Woodwinds - Bassoon Ensemble', 'trackarticulations': ['Staccato', 'Sforzato', 'Legato', 'Legato Auto-Speed', 'Legato Repetitions', 'Sustain', 'Cluster', 'Trill'] },
}


function hideShowArticulations(address, args) {
    if (address !== '/control') return
    if (args[1].value < 117) return
    if (args[1].value == 127) {
        sendOsc({
            address: '/control',
            args: [{ type: 'i', value: 1 }, { type: 'i', value: 126 }, { type: 'i', value: 1 }],
            host: 'midi',
            port: 'oscRecallIn'
        })
    }
    else {
        //Safe 
        if (args[1].value > 116 && args[1].value < 118) {
            var bank = (args[1].value - 117)
            var tracknumber = (bank * 128) + args[2].value

            buttons_short = []
            buttons_long = []
            buttons_legato = []
            buttons_deco = []

            selectedTrack = tracks[tracknumber]

            if (selectedTrack.trackarticulations.length > 0) {
                for (var articulation in articulations) {

                    var prg = parseInt(articulations[articulation].prg) - 1;

                    if (selectedTrack !== undefined && selectedTrack.trackarticulations.includes(articulation)) {

                        var type = articulations[articulation].type

                        switch (type) {
                            case 'short':
                                buttons_short.push({
                                    type: 'push',
                                    label: articulation,
                                    left: 'auto',
                                    top: 'auto',
                                    width: '100%',
                                    height: '100%',
                                    address: '/program',
                                    preArgs: '[1, ' + prg + ']',
                                    on: '1',
                                    off: '-1',
                                    norelease: true,
                                    target: 'midi:oscInstOut',
                                    precision: '0',
                                    css: `:host{
                                        border-radius:5px;
                                        background-color: ${bgcolors[articulations[articulation].colors]};
                                        color: ${colors[articulations[articulation].colors]};
                                        Font-size:100%;
                                    }
                                    .label {
                                        word-break: break-word;
                                        white-space: normal;
                                        line-height: normal;
                                    }`,
                                })
                                break
                            case 'long':
                                buttons_long.push({
                                    type: 'push',
                                    label: articulation,
                                    left: 'auto',
                                    top: 'auto',
                                    width: '100%',
                                    height: '100%',
                                    address: '/program',
                                    preArgs: '[1, ' + prg + ']',
                                    on: '1',
                                    off: '-1',
                                    norelease: true,
                                    target: 'midi:oscInstOut',
                                    precision: '0',
                                    css: `:host{
                                        border-radius:5px;
                                        background-color: ${bgcolors[articulations[articulation].colors]};
                                        color: ${colors[articulations[articulation].colors]};
                                        Font-size:100%;
                                    }
                                        .label {
                                            word-break: break-word;
                                            white-space: normal;
                                            line-height: normal;
                                    }`,
                                })
                                break;
                            case 'legato':
                                var css_icon = '';

                                if (articulations[articulation].icon !== undefined) { css_icon = `background-image:url('${articulations[articulation].icon}'); background-repeat: no-repeat; background-size:20%; background-position: left 10px center;` }

                                buttons_legato.push({
                                    type: 'push',
                                    label: articulation,
                                    left: 'auto',
                                    top: 'auto',
                                    width: '100%',
                                    height: '100%',
                                    address: '/program',
                                    preArgs: '[1, ' + prg + ']',
                                    on: '1',
                                    off: '-1',
                                    norelease: true,
                                    target: 'midi:oscInstOut',
                                    precision: '0',
                                    css: `:host{
                                            border-radius:5px;
                                            background-color: ${bgcolors[articulations[articulation].colors]};
                                            color: ${colors[articulations[articulation].colors]};
                                            Font-size:100%;
                                            ${css_icon}
                                        }
                                        .label {
                                            word-break: break-word;
                                            white-space: normal;
                                            line-height: normal;
                                        }`,
                                })
                                break;

                            case 'deco':
                                buttons_deco.push({
                                    type: 'push',
                                    label: articulation,
                                    left: 'auto',
                                    top: 'auto',
                                    width: '100%',
                                    height: '100%',
                                    address: '/program',
                                    preArgs: '[1, ' + prg + ']',
                                    on: '1',
                                    off: '-1',
                                    norelease: true,
                                    target: 'midi:oscInstOut',
                                    precision: '0',
                                    css: `:host{
                                        border-radius:5px;
                                        background-color: ${bgcolors[articulations[articulation].colors]};
                                        color: ${colors[articulations[articulation].colors]};
                                        Font-size:100%;
                                    }
                                    .label {
                                        word-break: break-word;
                                        white-space: normal;
                                        line-height: normal;
                                    }`,
                                })

                                break;
                        }
                    }
                }

                var panels = {}
                for (let type of ['short', 'long', 'legato', 'deco']) {
                    panels[type] = {
                        top: '0.79%',
                        height: '99.05%',
                        type: 'panel',
                        label: false,
                        scroll: false,
                        border: false,
                        id: 'panel_' + type,
                    }
                }
                panels['short'].width = '16.26%',
                    panels['long'].width = '32.97%',
                    panels['legato'].width = '32.97%',
                    panels['deco'].width = '16.26%',
                    panels['short'].left = '0.00%',
                    panels['long'].left = '16.71%',
                    panels['legato'].left = '50.15%',
                    panels['deco'].left = '83.56%',
                    panels['short'].css = `:host{border:0;box-shadow:none;--color-light:#transparent;} .panel {display: grid; grid-template-columns: repeat(1, auto); grid-template-rows: repeat(9, auto); grid-column-gap: 5px; grid-row-gap: 5px;`,
                    panels['long'].css = `:host{border:0;box-shadow:none;--color-light:#transparent;} .panel {display: grid; grid-template-columns: repeat(2, auto); grid-template-rows: repeat(9, auto); grid-column-gap: 5px; grid-row-gap: 5px;`,
                    panels['legato'].css = `:host{border:0;box-shadow:none;--color-light:#transparent;} .panel {display: grid; grid-template-columns: repeat(2, auto); grid-template-rows: repeat(9, auto); grid-column-gap: 5px; grid-row-gap: 5px;`,
                    panels['deco'].css = `:host{border:0;box-shadow:none;--color-light:#transparent;} .panel {display: grid; grid-template-columns: repeat(1, auto); grid-template-rows: repeat(9, auto); grid-column-gap: 5px; grid-row-gap: 5px;`,
                    receive('/EDIT', 'button_container_id', { widgets: Object.values(panels), label: 'Selected Track: ' + tracks[tracknumber].trackname })
                receive('/EDIT', 'panel_short', { widgets: Object.values(buttons_short) })
                receive('/EDIT', 'panel_long', { widgets: Object.values(buttons_long) })
                receive('/EDIT', 'panel_legato', { widgets: Object.values(buttons_legato) })
                receive('/EDIT', 'panel_deco', { widgets: Object.values(buttons_deco) })
            } else {
                console.log('---- Leeres Template')
                var infopanel = []
                infopanel.push({
                    "type": "push",
                    "top": 0,
                    "left": 0,
                    "id": "push_1",
                    "linkId": "",
                    "width": '100%',
                    "height": '100%',
                    "label": "^spinner",
                    "color": "auto",
                    "css": ":host{ border-radius:5px; text-transform:none; Font-size:500%; }",
                    "doubleTap": false,
                    "on": 1,
                    "off": 0,
                }),

                    receive('/EDIT', 'button_container_id', { widgets: Object.values(infopanel), label: 'Selected Track: ' + tracks[tracknumber].trackname })
            }

        }
    }
}

// Tap2Tempo Module
function reset() {

    tapDurations = [0, 0, 0, 0, 0]
    tapIndex = -1

}

// Tap2Tempo Module
function receiveTap(data) {

    var tapTime = Date.now()

    // if last tap is too far (based on MIN_BPM), reset stored value and wait until next tap
    if (tapTime - lastTapTime > maxTapLength) {
        lastTapTime = tapTime
        reset()
        return
    }

    // store tap duration
    tapIndex++
    tapDurations[tapIndex % tapDurations.length] = tapTime - lastTapTime
    lastTapTime = tapTime

    // update bpm
    updateBpm(data)

}

// Tap2Tempo Module
function updateBpm(data) {

    // filter tap durations (exclude zeros)
    var durations = tapDurations.filter(x => x > 0)

    // we need at least one value
    if (durations.length < 1) return

    // compute average tap duration
    var sum = durations.reduce((previous, current) => current += previous),
        avg = sum / durations.length,
        bpm = Math.round(60 / (avg / 1000))

    // send bpm back to the interface
    receive('/bpm', bpm)

    // send bpm to the button's original target/address ?
    send(data.host, data.port, data.address, bpm)
}

// OSC Midi Sequence Module

function controlSequence(host, port, address, preArgs, sequence) {

    var i = 0
    var timer = setInterval(()=>{
        send(host, port, '/control', ...preArgs, sequence[i])
        i += 1
        if (i == sequence.length) clearInterval(timer)
    }, 100)

}

// OSC Midi Sequence Vars
var sequenceRouting = {
    // '/address': ['/midi_address', [preArgs], [sequence]]
	'/control_sequence_001': ['/control', [16, 114], [127, 0, 0, 1]],
	'/control_sequence_002': ['/control', [16, 114], [127, 0, 0, 2]],
	'/control_sequence_003': ['/control', [16, 114], [127, 0, 0, 3]],
	'/control_sequence_004': ['/control', [16, 114], [127, 0, 0, 4]],
	'/control_sequence_005': ['/control', [16, 114], [127, 0, 0, 5]],
	'/control_sequence_006': ['/control', [16, 114], [127, 0, 0, 6]],
	'/control_sequence_007': ['/control', [16, 114], [127, 0, 0, 7]],
	'/control_sequence_008': ['/control', [16, 114], [127, 0, 0, 8]],
	'/control_sequence_009': ['/control', [16, 114], [127, 0, 0, 9]],
	'/control_sequence_010': ['/control', [16, 114], [127, 0, 1, 0]],
	'/control_sequence_011': ['/control', [16, 114], [127, 0, 1, 1]],
	'/control_sequence_012': ['/control', [16, 114], [127, 0, 1, 2]],
	'/control_sequence_013': ['/control', [16, 114], [127, 0, 1, 3]],
	'/control_sequence_014': ['/control', [16, 114], [127, 0, 1, 4]],
	'/control_sequence_015': ['/control', [16, 114], [127, 0, 1, 5]],
	'/control_sequence_016': ['/control', [16, 114], [127, 0, 1, 6]],
	'/control_sequence_017': ['/control', [16, 114], [127, 0, 1, 7]],
	'/control_sequence_018': ['/control', [16, 114], [127, 0, 1, 8]],
	'/control_sequence_019': ['/control', [16, 114], [127, 0, 1, 9]],
	'/control_sequence_020': ['/control', [16, 114], [127, 0, 2, 0]],
	'/control_sequence_021': ['/control', [16, 114], [127, 0, 2, 1]],
	'/control_sequence_022': ['/control', [16, 114], [127, 0, 2, 2]],
	'/control_sequence_023': ['/control', [16, 114], [127, 0, 2, 3]],
	'/control_sequence_024': ['/control', [16, 114], [127, 0, 2, 4]],
	'/control_sequence_025': ['/control', [16, 114], [127, 0, 2, 5]],
	'/control_sequence_026': ['/control', [16, 114], [127, 0, 2, 6]],
	'/control_sequence_027': ['/control', [16, 114], [127, 0, 2, 7]],
	'/control_sequence_028': ['/control', [16, 114], [127, 0, 2, 8]],
	'/control_sequence_029': ['/control', [16, 114], [127, 0, 2, 9]],
	'/control_sequence_030': ['/control', [16, 114], [127, 0, 3, 0]],
	'/control_sequence_031': ['/control', [16, 114], [127, 0, 3, 1]],
	'/control_sequence_032': ['/control', [16, 114], [127, 0, 3, 2]],
	'/control_sequence_033': ['/control', [16, 114], [127, 0, 3, 3]],
	'/control_sequence_034': ['/control', [16, 114], [127, 0, 3, 4]],
	'/control_sequence_035': ['/control', [16, 114], [127, 0, 3, 5]],
	'/control_sequence_036': ['/control', [16, 114], [127, 0, 3, 6]],
	'/control_sequence_037': ['/control', [16, 114], [127, 0, 3, 7]],
	'/control_sequence_038': ['/control', [16, 114], [127, 0, 3, 8]],
	'/control_sequence_039': ['/control', [16, 114], [127, 0, 3, 9]],
	'/control_sequence_040': ['/control', [16, 114], [127, 0, 4, 0]],
	'/control_sequence_041': ['/control', [16, 114], [127, 0, 4, 1]],
	'/control_sequence_042': ['/control', [16, 114], [127, 0, 4, 2]],
	'/control_sequence_043': ['/control', [16, 114], [127, 0, 4, 3]],
	'/control_sequence_044': ['/control', [16, 114], [127, 0, 4, 4]],
	'/control_sequence_045': ['/control', [16, 114], [127, 0, 4, 5]],
	'/control_sequence_046': ['/control', [16, 114], [127, 0, 4, 6]],
	'/control_sequence_047': ['/control', [16, 114], [127, 0, 4, 7]],
	'/control_sequence_048': ['/control', [16, 114], [127, 0, 4, 8]],
	'/control_sequence_049': ['/control', [16, 114], [127, 0, 4, 9]],
	'/control_sequence_050': ['/control', [16, 114], [127, 0, 5, 0]],
	'/control_sequence_051': ['/control', [16, 114], [127, 0, 5, 1]],
	'/control_sequence_052': ['/control', [16, 114], [127, 0, 5, 2]],
	'/control_sequence_053': ['/control', [16, 114], [127, 0, 5, 3]],
	'/control_sequence_054': ['/control', [16, 114], [127, 0, 5, 4]],
	'/control_sequence_055': ['/control', [16, 114], [127, 0, 5, 5]],
	'/control_sequence_056': ['/control', [16, 114], [127, 0, 5, 6]],
	'/control_sequence_057': ['/control', [16, 114], [127, 0, 5, 7]],
	'/control_sequence_058': ['/control', [16, 114], [127, 0, 5, 8]],
	'/control_sequence_059': ['/control', [16, 114], [127, 0, 5, 9]],
	'/control_sequence_060': ['/control', [16, 114], [127, 0, 6, 0]],
	'/control_sequence_061': ['/control', [16, 114], [127, 0, 6, 1]],
	'/control_sequence_062': ['/control', [16, 114], [127, 0, 6, 2]],
	'/control_sequence_063': ['/control', [16, 114], [127, 0, 6, 3]],
	'/control_sequence_064': ['/control', [16, 114], [127, 0, 6, 4]],
	'/control_sequence_065': ['/control', [16, 114], [127, 0, 6, 5]],
	'/control_sequence_066': ['/control', [16, 114], [127, 0, 6, 6]],
	'/control_sequence_067': ['/control', [16, 114], [127, 0, 6, 7]],
	'/control_sequence_068': ['/control', [16, 114], [127, 0, 6, 8]],
	'/control_sequence_069': ['/control', [16, 114], [127, 0, 6, 9]],
	'/control_sequence_070': ['/control', [16, 114], [127, 0, 7, 0]],
	'/control_sequence_071': ['/control', [16, 114], [127, 0, 7, 1]],
	'/control_sequence_072': ['/control', [16, 114], [127, 0, 7, 2]],
	'/control_sequence_073': ['/control', [16, 114], [127, 0, 7, 3]],
	'/control_sequence_074': ['/control', [16, 114], [127, 0, 7, 4]],
	'/control_sequence_075': ['/control', [16, 114], [127, 0, 7, 5]],
	'/control_sequence_076': ['/control', [16, 114], [127, 0, 7, 6]],
	'/control_sequence_077': ['/control', [16, 114], [127, 0, 7, 7]],
	'/control_sequence_078': ['/control', [16, 114], [127, 0, 7, 8]],
	'/control_sequence_079': ['/control', [16, 114], [127, 0, 7, 9]],
	'/control_sequence_080': ['/control', [16, 114], [127, 0, 8, 0]],
	'/control_sequence_081': ['/control', [16, 114], [127, 0, 8, 1]],
	'/control_sequence_082': ['/control', [16, 114], [127, 0, 8, 2]],
	'/control_sequence_083': ['/control', [16, 114], [127, 0, 8, 3]],
	'/control_sequence_084': ['/control', [16, 114], [127, 0, 8, 4]],
	'/control_sequence_085': ['/control', [16, 114], [127, 0, 8, 5]],
	'/control_sequence_086': ['/control', [16, 114], [127, 0, 8, 6]],
	'/control_sequence_087': ['/control', [16, 114], [127, 0, 8, 7]],
	'/control_sequence_088': ['/control', [16, 114], [127, 0, 8, 8]],
	'/control_sequence_089': ['/control', [16, 114], [127, 0, 8, 9]],
	'/control_sequence_090': ['/control', [16, 114], [127, 0, 9, 0]],
	'/control_sequence_091': ['/control', [16, 114], [127, 0, 9, 1]],
	'/control_sequence_092': ['/control', [16, 114], [127, 0, 9, 2]],
	'/control_sequence_093': ['/control', [16, 114], [127, 0, 9, 3]],
	'/control_sequence_094': ['/control', [16, 114], [127, 0, 9, 4]],
	'/control_sequence_095': ['/control', [16, 114], [127, 0, 9, 5]],
	'/control_sequence_096': ['/control', [16, 114], [127, 0, 9, 6]],
	'/control_sequence_097': ['/control', [16, 114], [127, 0, 9, 7]],
	'/control_sequence_098': ['/control', [16, 114], [127, 0, 9, 8]],
	'/control_sequence_099': ['/control', [16, 114], [127, 0, 9, 9]],
	'/control_sequence_100': ['/control', [16, 114], [127, 1, 0, 0]],
	'/control_sequence_101': ['/control', [16, 114], [127, 1, 0, 1]],
	'/control_sequence_102': ['/control', [16, 114], [127, 1, 0, 2]],
	'/control_sequence_103': ['/control', [16, 114], [127, 1, 0, 3]],
	'/control_sequence_104': ['/control', [16, 114], [127, 1, 0, 4]],
	'/control_sequence_105': ['/control', [16, 114], [127, 1, 0, 5]],
	'/control_sequence_106': ['/control', [16, 114], [127, 1, 0, 6]],
	'/control_sequence_107': ['/control', [16, 114], [127, 1, 0, 7]],
	'/control_sequence_108': ['/control', [16, 114], [127, 1, 0, 8]],
	'/control_sequence_109': ['/control', [16, 114], [127, 1, 0, 9]],
	'/control_sequence_110': ['/control', [16, 114], [127, 1, 1, 0]],
	'/control_sequence_111': ['/control', [16, 114], [127, 1, 1, 1]],
	'/control_sequence_112': ['/control', [16, 114], [127, 1, 1, 2]],
	'/control_sequence_113': ['/control', [16, 114], [127, 1, 1, 3]],
	'/control_sequence_114': ['/control', [16, 114], [127, 1, 1, 4]],
	'/control_sequence_115': ['/control', [16, 114], [127, 1, 1, 5]],
	'/control_sequence_116': ['/control', [16, 114], [127, 1, 1, 6]],
	'/control_sequence_117': ['/control', [16, 114], [127, 1, 1, 7]],
	'/control_sequence_118': ['/control', [16, 114], [127, 1, 1, 8]],
	'/control_sequence_119': ['/control', [16, 114], [127, 1, 1, 9]],
	'/control_sequence_120': ['/control', [16, 114], [127, 1, 2, 0]],
	'/control_sequence_121': ['/control', [16, 114], [127, 1, 2, 1]],
	'/control_sequence_122': ['/control', [16, 114], [127, 1, 2, 2]],
	'/control_sequence_123': ['/control', [16, 114], [127, 1, 2, 3]],
	'/control_sequence_124': ['/control', [16, 114], [127, 1, 2, 4]],
	'/control_sequence_125': ['/control', [16, 114], [127, 1, 2, 5]],
	'/control_sequence_126': ['/control', [16, 114], [127, 1, 2, 6]],
	'/control_sequence_127': ['/control', [16, 114], [127, 1, 2, 7]],
	'/control_sequence_128': ['/control', [16, 114], [127, 1, 2, 8]],
	'/control_sequence_129': ['/control', [16, 114], [127, 1, 2, 9]],
	'/control_sequence_130': ['/control', [16, 114], [127, 1, 3, 0]],
	'/control_sequence_131': ['/control', [16, 114], [127, 1, 3, 1]],
	'/control_sequence_132': ['/control', [16, 114], [127, 1, 3, 2]],
	'/control_sequence_133': ['/control', [16, 114], [127, 1, 3, 3]],
	'/control_sequence_134': ['/control', [16, 114], [127, 1, 3, 4]],
	'/control_sequence_135': ['/control', [16, 114], [127, 1, 3, 5]],
	'/control_sequence_136': ['/control', [16, 114], [127, 1, 3, 6]],
	'/control_sequence_137': ['/control', [16, 114], [127, 1, 3, 7]],
	'/control_sequence_138': ['/control', [16, 114], [127, 1, 3, 8]],
	'/control_sequence_139': ['/control', [16, 114], [127, 1, 3, 9]],
	'/control_sequence_140': ['/control', [16, 114], [127, 1, 4, 0]],
	'/control_sequence_141': ['/control', [16, 114], [127, 1, 4, 1]],
	'/control_sequence_142': ['/control', [16, 114], [127, 1, 4, 2]],
	'/control_sequence_143': ['/control', [16, 114], [127, 1, 4, 3]],
	'/control_sequence_144': ['/control', [16, 114], [127, 1, 4, 4]],
	'/control_sequence_145': ['/control', [16, 114], [127, 1, 4, 5]],
	'/control_sequence_146': ['/control', [16, 114], [127, 1, 4, 6]],
	'/control_sequence_147': ['/control', [16, 114], [127, 1, 4, 7]],
	'/control_sequence_148': ['/control', [16, 114], [127, 1, 4, 8]],
	'/control_sequence_149': ['/control', [16, 114], [127, 1, 4, 9]],
	'/control_sequence_150': ['/control', [16, 114], [127, 1, 5, 0]],
	'/control_sequence_151': ['/control', [16, 114], [127, 1, 5, 1]],
	'/control_sequence_152': ['/control', [16, 114], [127, 1, 5, 2]],
	'/control_sequence_153': ['/control', [16, 114], [127, 1, 5, 3]],
	'/control_sequence_154': ['/control', [16, 114], [127, 1, 5, 4]],
	'/control_sequence_155': ['/control', [16, 114], [127, 1, 5, 5]],
	'/control_sequence_156': ['/control', [16, 114], [127, 1, 5, 6]],
	'/control_sequence_157': ['/control', [16, 114], [127, 1, 5, 7]],
	'/control_sequence_158': ['/control', [16, 114], [127, 1, 5, 8]],
	'/control_sequence_159': ['/control', [16, 114], [127, 1, 5, 9]],
	'/control_sequence_160': ['/control', [16, 114], [127, 1, 6, 0]],
	'/control_sequence_161': ['/control', [16, 114], [127, 1, 6, 1]],
	'/control_sequence_162': ['/control', [16, 114], [127, 1, 6, 2]],
	'/control_sequence_163': ['/control', [16, 114], [127, 1, 6, 3]],
	'/control_sequence_164': ['/control', [16, 114], [127, 1, 6, 4]],
	'/control_sequence_165': ['/control', [16, 114], [127, 1, 6, 5]],
	'/control_sequence_166': ['/control', [16, 114], [127, 1, 6, 6]],
	'/control_sequence_167': ['/control', [16, 114], [127, 1, 6, 7]],
	'/control_sequence_168': ['/control', [16, 114], [127, 1, 6, 8]],
	'/control_sequence_169': ['/control', [16, 114], [127, 1, 6, 9]],
	'/control_sequence_170': ['/control', [16, 114], [127, 1, 7, 0]],
	'/control_sequence_171': ['/control', [16, 114], [127, 1, 7, 1]],
	'/control_sequence_172': ['/control', [16, 114], [127, 1, 7, 2]],
	'/control_sequence_173': ['/control', [16, 114], [127, 1, 7, 3]],
	'/control_sequence_174': ['/control', [16, 114], [127, 1, 7, 4]],
	'/control_sequence_175': ['/control', [16, 114], [127, 1, 7, 5]],
	'/control_sequence_176': ['/control', [16, 114], [127, 1, 7, 6]],
	'/control_sequence_177': ['/control', [16, 114], [127, 1, 7, 7]],
	'/control_sequence_178': ['/control', [16, 114], [127, 1, 7, 8]],
	'/control_sequence_179': ['/control', [16, 114], [127, 1, 7, 9]],
	'/control_sequence_180': ['/control', [16, 114], [127, 1, 8, 0]],
	'/control_sequence_181': ['/control', [16, 114], [127, 1, 8, 1]],
	'/control_sequence_182': ['/control', [16, 114], [127, 1, 8, 2]],
	'/control_sequence_183': ['/control', [16, 114], [127, 1, 8, 3]],
	'/control_sequence_184': ['/control', [16, 114], [127, 1, 8, 4]],
	'/control_sequence_185': ['/control', [16, 114], [127, 1, 8, 5]],
	'/control_sequence_186': ['/control', [16, 114], [127, 1, 8, 6]],
	'/control_sequence_187': ['/control', [16, 114], [127, 1, 8, 7]],
	'/control_sequence_188': ['/control', [16, 114], [127, 1, 8, 8]],
	'/control_sequence_189': ['/control', [16, 114], [127, 1, 8, 9]],
	'/control_sequence_190': ['/control', [16, 114], [127, 1, 9, 0]],
	'/control_sequence_191': ['/control', [16, 114], [127, 1, 9, 1]],
	'/control_sequence_192': ['/control', [16, 114], [127, 1, 9, 2]],
	'/control_sequence_193': ['/control', [16, 114], [127, 1, 9, 3]],
	'/control_sequence_194': ['/control', [16, 114], [127, 1, 9, 4]],
	'/control_sequence_195': ['/control', [16, 114], [127, 1, 9, 5]],
	'/control_sequence_196': ['/control', [16, 114], [127, 1, 9, 6]],
	'/control_sequence_197': ['/control', [16, 114], [127, 1, 9, 7]],
	'/control_sequence_198': ['/control', [16, 114], [127, 1, 9, 8]],
	'/control_sequence_199': ['/control', [16, 114], [127, 1, 9, 9]],
	'/control_sequence_200': ['/control', [16, 114], [127, 2, 0, 0]],
	'/control_sequence_201': ['/control', [16, 114], [127, 2, 0, 1]],
	'/control_sequence_202': ['/control', [16, 114], [127, 2, 0, 2]],
	'/control_sequence_203': ['/control', [16, 114], [127, 2, 0, 3]],
	'/control_sequence_204': ['/control', [16, 114], [127, 2, 0, 4]],
	'/control_sequence_205': ['/control', [16, 114], [127, 2, 0, 5]],
	'/control_sequence_206': ['/control', [16, 114], [127, 2, 0, 6]],
	'/control_sequence_207': ['/control', [16, 114], [127, 2, 0, 7]],
	'/control_sequence_208': ['/control', [16, 114], [127, 2, 0, 8]],
	'/control_sequence_209': ['/control', [16, 114], [127, 2, 0, 9]],
	'/control_sequence_210': ['/control', [16, 114], [127, 2, 1, 0]],
	'/control_sequence_211': ['/control', [16, 114], [127, 2, 1, 1]],
	'/control_sequence_212': ['/control', [16, 114], [127, 2, 1, 2]],
	'/control_sequence_213': ['/control', [16, 114], [127, 2, 1, 3]],
	'/control_sequence_214': ['/control', [16, 114], [127, 2, 1, 4]],
	'/control_sequence_215': ['/control', [16, 114], [127, 2, 1, 5]],
	'/control_sequence_216': ['/control', [16, 114], [127, 2, 1, 6]],
	'/control_sequence_217': ['/control', [16, 114], [127, 2, 1, 7]],
	'/control_sequence_218': ['/control', [16, 114], [127, 2, 1, 8]],
	'/control_sequence_219': ['/control', [16, 114], [127, 2, 1, 9]],
	'/control_sequence_220': ['/control', [16, 114], [127, 2, 2, 0]],
	'/control_sequence_221': ['/control', [16, 114], [127, 2, 2, 1]],
	'/control_sequence_222': ['/control', [16, 114], [127, 2, 2, 2]],
	'/control_sequence_223': ['/control', [16, 114], [127, 2, 2, 3]],
	'/control_sequence_224': ['/control', [16, 114], [127, 2, 2, 4]],
	'/control_sequence_225': ['/control', [16, 114], [127, 2, 2, 5]],
	'/control_sequence_226': ['/control', [16, 114], [127, 2, 2, 6]],
	'/control_sequence_227': ['/control', [16, 114], [127, 2, 2, 7]],
	'/control_sequence_228': ['/control', [16, 114], [127, 2, 2, 8]],
	'/control_sequence_229': ['/control', [16, 114], [127, 2, 2, 9]],
	'/control_sequence_230': ['/control', [16, 114], [127, 2, 3, 0]],
	'/control_sequence_231': ['/control', [16, 114], [127, 2, 3, 1]],
	'/control_sequence_232': ['/control', [16, 114], [127, 2, 3, 2]],
	'/control_sequence_233': ['/control', [16, 114], [127, 2, 3, 3]],
	'/control_sequence_234': ['/control', [16, 114], [127, 2, 3, 4]],
	'/control_sequence_235': ['/control', [16, 114], [127, 2, 3, 5]],
	'/control_sequence_236': ['/control', [16, 114], [127, 2, 3, 6]],
	'/control_sequence_237': ['/control', [16, 114], [127, 2, 3, 7]],
	'/control_sequence_238': ['/control', [16, 114], [127, 2, 3, 8]],
	'/control_sequence_239': ['/control', [16, 114], [127, 2, 3, 9]],
	'/control_sequence_240': ['/control', [16, 114], [127, 2, 4, 0]],
	'/control_sequence_241': ['/control', [16, 114], [127, 2, 4, 1]],
	'/control_sequence_242': ['/control', [16, 114], [127, 2, 4, 2]],
	'/control_sequence_243': ['/control', [16, 114], [127, 2, 4, 3]],
	'/control_sequence_244': ['/control', [16, 114], [127, 2, 4, 4]],
	'/control_sequence_245': ['/control', [16, 114], [127, 2, 4, 5]],
	'/control_sequence_246': ['/control', [16, 114], [127, 2, 4, 6]],
	'/control_sequence_247': ['/control', [16, 114], [127, 2, 4, 7]],
	'/control_sequence_248': ['/control', [16, 114], [127, 2, 4, 8]],
	'/control_sequence_249': ['/control', [16, 114], [127, 2, 4, 9]],
	'/control_sequence_250': ['/control', [16, 114], [127, 2, 5, 0]],
	'/control_sequence_251': ['/control', [16, 114], [127, 2, 5, 1]],
	'/control_sequence_252': ['/control', [16, 114], [127, 2, 5, 2]],
	'/control_sequence_253': ['/control', [16, 114], [127, 2, 5, 3]],
	'/control_sequence_254': ['/control', [16, 114], [127, 2, 5, 4]],
	'/control_sequence_255': ['/control', [16, 114], [127, 2, 5, 5]],
	'/control_sequence_256': ['/control', [16, 114], [127, 2, 5, 6]],
	'/control_sequence_257': ['/control', [16, 114], [127, 2, 5, 7]],
	'/control_sequence_258': ['/control', [16, 114], [127, 2, 5, 8]],
	'/control_sequence_259': ['/control', [16, 114], [127, 2, 5, 9]],
	'/control_sequence_260': ['/control', [16, 114], [127, 2, 6, 0]],
	'/control_sequence_261': ['/control', [16, 114], [127, 2, 6, 1]],
	'/control_sequence_262': ['/control', [16, 114], [127, 2, 6, 2]],
	'/control_sequence_263': ['/control', [16, 114], [127, 2, 6, 3]],
	'/control_sequence_264': ['/control', [16, 114], [127, 2, 6, 4]],
	'/control_sequence_265': ['/control', [16, 114], [127, 2, 6, 5]],
	'/control_sequence_266': ['/control', [16, 114], [127, 2, 6, 6]],
	'/control_sequence_267': ['/control', [16, 114], [127, 2, 6, 7]],
	'/control_sequence_268': ['/control', [16, 114], [127, 2, 6, 8]],
	'/control_sequence_269': ['/control', [16, 114], [127, 2, 6, 9]],
	'/control_sequence_270': ['/control', [16, 114], [127, 2, 7, 0]],
	'/control_sequence_271': ['/control', [16, 114], [127, 2, 7, 1]],
	'/control_sequence_272': ['/control', [16, 114], [127, 2, 7, 2]],
	'/control_sequence_273': ['/control', [16, 114], [127, 2, 7, 3]],
	'/control_sequence_274': ['/control', [16, 114], [127, 2, 7, 4]],
	'/control_sequence_275': ['/control', [16, 114], [127, 2, 7, 5]],
	'/control_sequence_276': ['/control', [16, 114], [127, 2, 7, 6]],
	'/control_sequence_277': ['/control', [16, 114], [127, 2, 7, 7]],
	'/control_sequence_278': ['/control', [16, 114], [127, 2, 7, 8]],
	'/control_sequence_279': ['/control', [16, 114], [127, 2, 7, 9]],
	'/control_sequence_280': ['/control', [16, 114], [127, 2, 8, 0]],
	'/control_sequence_281': ['/control', [16, 114], [127, 2, 8, 1]],
	'/control_sequence_282': ['/control', [16, 114], [127, 2, 8, 2]],
	'/control_sequence_283': ['/control', [16, 114], [127, 2, 8, 3]],
	'/control_sequence_284': ['/control', [16, 114], [127, 2, 8, 4]],
	'/control_sequence_285': ['/control', [16, 114], [127, 2, 8, 5]],
	'/control_sequence_286': ['/control', [16, 114], [127, 2, 8, 6]],
	'/control_sequence_287': ['/control', [16, 114], [127, 2, 8, 7]],
	'/control_sequence_288': ['/control', [16, 114], [127, 2, 8, 8]],
	'/control_sequence_289': ['/control', [16, 114], [127, 2, 8, 9]],
	'/control_sequence_290': ['/control', [16, 114], [127, 2, 9, 0]],
	'/control_sequence_291': ['/control', [16, 114], [127, 2, 9, 1]],
	'/control_sequence_292': ['/control', [16, 114], [127, 2, 9, 2]],
	'/control_sequence_293': ['/control', [16, 114], [127, 2, 9, 3]],
	'/control_sequence_294': ['/control', [16, 114], [127, 2, 9, 4]],
	'/control_sequence_295': ['/control', [16, 114], [127, 2, 9, 5]],
	'/control_sequence_296': ['/control', [16, 114], [127, 2, 9, 6]],
	'/control_sequence_297': ['/control', [16, 114], [127, 2, 9, 7]],
	'/control_sequence_298': ['/control', [16, 114], [127, 2, 9, 8]],
	'/control_sequence_299': ['/control', [16, 114], [127, 2, 9, 9]],
	'/control_sequence_300': ['/control', [16, 114], [127, 3, 0, 0]],
	'/control_sequence_301': ['/control', [16, 114], [127, 3, 0, 1]],
	'/control_sequence_302': ['/control', [16, 114], [127, 3, 0, 2]],
	'/control_sequence_303': ['/control', [16, 114], [127, 3, 0, 3]],
	'/control_sequence_304': ['/control', [16, 114], [127, 3, 0, 4]],
	'/control_sequence_305': ['/control', [16, 114], [127, 3, 0, 5]],
	'/control_sequence_306': ['/control', [16, 114], [127, 3, 0, 6]],
	'/control_sequence_307': ['/control', [16, 114], [127, 3, 0, 7]],
	'/control_sequence_308': ['/control', [16, 114], [127, 3, 0, 8]],
	'/control_sequence_309': ['/control', [16, 114], [127, 3, 0, 9]],
	'/control_sequence_310': ['/control', [16, 114], [127, 3, 1, 0]],
	'/control_sequence_311': ['/control', [16, 114], [127, 3, 1, 1]],
	'/control_sequence_312': ['/control', [16, 114], [127, 3, 1, 2]],
	'/control_sequence_313': ['/control', [16, 114], [127, 3, 1, 3]],
	'/control_sequence_314': ['/control', [16, 114], [127, 3, 1, 4]],
	'/control_sequence_315': ['/control', [16, 114], [127, 3, 1, 5]],
	'/control_sequence_316': ['/control', [16, 114], [127, 3, 1, 6]],
	'/control_sequence_317': ['/control', [16, 114], [127, 3, 1, 7]],
	'/control_sequence_318': ['/control', [16, 114], [127, 3, 1, 8]],
	'/control_sequence_319': ['/control', [16, 114], [127, 3, 1, 9]],
	'/control_sequence_320': ['/control', [16, 114], [127, 3, 2, 0]],
	'/control_sequence_321': ['/control', [16, 114], [127, 3, 2, 1]],
	'/control_sequence_322': ['/control', [16, 114], [127, 3, 2, 2]],
	'/control_sequence_323': ['/control', [16, 114], [127, 3, 2, 3]],
	'/control_sequence_324': ['/control', [16, 114], [127, 3, 2, 4]],
	'/control_sequence_325': ['/control', [16, 114], [127, 3, 2, 5]],
	'/control_sequence_326': ['/control', [16, 114], [127, 3, 2, 6]],
	'/control_sequence_327': ['/control', [16, 114], [127, 3, 2, 7]],
	'/control_sequence_328': ['/control', [16, 114], [127, 3, 2, 8]],
	'/control_sequence_329': ['/control', [16, 114], [127, 3, 2, 9]],
	'/control_sequence_330': ['/control', [16, 114], [127, 3, 3, 0]],
	'/control_sequence_331': ['/control', [16, 114], [127, 3, 3, 1]],
	'/control_sequence_332': ['/control', [16, 114], [127, 3, 3, 2]],
	'/control_sequence_333': ['/control', [16, 114], [127, 3, 3, 3]],
	'/control_sequence_334': ['/control', [16, 114], [127, 3, 3, 4]],
	'/control_sequence_335': ['/control', [16, 114], [127, 3, 3, 5]],
	'/control_sequence_336': ['/control', [16, 114], [127, 3, 3, 6]],
	'/control_sequence_337': ['/control', [16, 114], [127, 3, 3, 7]],
	'/control_sequence_338': ['/control', [16, 114], [127, 3, 3, 8]],
	'/control_sequence_339': ['/control', [16, 114], [127, 3, 3, 9]],
	'/control_sequence_340': ['/control', [16, 114], [127, 3, 4, 0]],
	'/control_sequence_341': ['/control', [16, 114], [127, 3, 4, 1]],
	'/control_sequence_342': ['/control', [16, 114], [127, 3, 4, 2]],
	'/control_sequence_343': ['/control', [16, 114], [127, 3, 4, 3]],
	'/control_sequence_344': ['/control', [16, 114], [127, 3, 4, 4]],
	'/control_sequence_345': ['/control', [16, 114], [127, 3, 4, 5]],
	'/control_sequence_346': ['/control', [16, 114], [127, 3, 4, 6]],
	'/control_sequence_347': ['/control', [16, 114], [127, 3, 4, 7]],
	'/control_sequence_348': ['/control', [16, 114], [127, 3, 4, 8]],
	'/control_sequence_349': ['/control', [16, 114], [127, 3, 4, 9]],
	'/control_sequence_350': ['/control', [16, 114], [127, 3, 5, 0]],
	'/control_sequence_351': ['/control', [16, 114], [127, 3, 5, 1]],
	'/control_sequence_352': ['/control', [16, 114], [127, 3, 5, 2]],
	'/control_sequence_353': ['/control', [16, 114], [127, 3, 5, 3]],
	'/control_sequence_354': ['/control', [16, 114], [127, 3, 5, 4]],
	'/control_sequence_355': ['/control', [16, 114], [127, 3, 5, 5]],
	'/control_sequence_356': ['/control', [16, 114], [127, 3, 5, 6]],
	'/control_sequence_357': ['/control', [16, 114], [127, 3, 5, 7]],
	'/control_sequence_358': ['/control', [16, 114], [127, 3, 5, 8]],
	'/control_sequence_359': ['/control', [16, 114], [127, 3, 5, 9]],
	'/control_sequence_360': ['/control', [16, 114], [127, 3, 6, 0]],
	'/control_sequence_361': ['/control', [16, 114], [127, 3, 6, 1]],
	'/control_sequence_362': ['/control', [16, 114], [127, 3, 6, 2]],
	'/control_sequence_363': ['/control', [16, 114], [127, 3, 6, 3]],
	'/control_sequence_364': ['/control', [16, 114], [127, 3, 6, 4]],
	'/control_sequence_365': ['/control', [16, 114], [127, 3, 6, 5]],
	'/control_sequence_366': ['/control', [16, 114], [127, 3, 6, 6]],
	'/control_sequence_367': ['/control', [16, 114], [127, 3, 6, 7]],
	'/control_sequence_368': ['/control', [16, 114], [127, 3, 6, 8]],
	'/control_sequence_369': ['/control', [16, 114], [127, 3, 6, 9]],
	'/control_sequence_370': ['/control', [16, 114], [127, 3, 7, 0]],
	'/control_sequence_371': ['/control', [16, 114], [127, 3, 7, 1]],
	'/control_sequence_372': ['/control', [16, 114], [127, 3, 7, 2]],
	'/control_sequence_373': ['/control', [16, 114], [127, 3, 7, 3]],
	'/control_sequence_374': ['/control', [16, 114], [127, 3, 7, 4]],
	'/control_sequence_375': ['/control', [16, 114], [127, 3, 7, 5]],
	'/control_sequence_376': ['/control', [16, 114], [127, 3, 7, 6]],
	'/control_sequence_377': ['/control', [16, 114], [127, 3, 7, 7]],
	'/control_sequence_378': ['/control', [16, 114], [127, 3, 7, 8]],
	'/control_sequence_379': ['/control', [16, 114], [127, 3, 7, 9]],
	'/control_sequence_380': ['/control', [16, 114], [127, 3, 8, 0]],
	'/control_sequence_381': ['/control', [16, 114], [127, 3, 8, 1]],
	'/control_sequence_382': ['/control', [16, 114], [127, 3, 8, 2]],
	'/control_sequence_383': ['/control', [16, 114], [127, 3, 8, 3]],
	'/control_sequence_384': ['/control', [16, 114], [127, 3, 8, 4]],
	'/control_sequence_385': ['/control', [16, 114], [127, 3, 8, 5]],
	'/control_sequence_386': ['/control', [16, 114], [127, 3, 8, 6]],
	'/control_sequence_387': ['/control', [16, 114], [127, 3, 8, 7]],
	'/control_sequence_388': ['/control', [16, 114], [127, 3, 8, 8]],
	'/control_sequence_389': ['/control', [16, 114], [127, 3, 8, 9]],
	'/control_sequence_390': ['/control', [16, 114], [127, 3, 9, 0]],
	'/control_sequence_391': ['/control', [16, 114], [127, 3, 9, 1]],
	'/control_sequence_392': ['/control', [16, 114], [127, 3, 9, 2]],
	'/control_sequence_393': ['/control', [16, 114], [127, 3, 9, 3]],
	'/control_sequence_394': ['/control', [16, 114], [127, 3, 9, 4]],
	'/control_sequence_395': ['/control', [16, 114], [127, 3, 9, 5]],
	'/control_sequence_396': ['/control', [16, 114], [127, 3, 9, 6]],
	'/control_sequence_397': ['/control', [16, 114], [127, 3, 9, 7]],
	'/control_sequence_398': ['/control', [16, 114], [127, 3, 9, 8]],
	'/control_sequence_399': ['/control', [16, 114], [127, 3, 9, 9]],
	'/control_sequence_400': ['/control', [16, 114], [127, 4, 0, 0]],
	'/control_sequence_401': ['/control', [16, 114], [127, 4, 0, 1]],
	'/control_sequence_402': ['/control', [16, 114], [127, 4, 0, 2]],
	'/control_sequence_403': ['/control', [16, 114], [127, 4, 0, 3]],
	'/control_sequence_404': ['/control', [16, 114], [127, 4, 0, 4]],
	'/control_sequence_405': ['/control', [16, 114], [127, 4, 0, 5]],
	'/control_sequence_406': ['/control', [16, 114], [127, 4, 0, 6]],
	'/control_sequence_407': ['/control', [16, 114], [127, 4, 0, 7]],
	'/control_sequence_408': ['/control', [16, 114], [127, 4, 0, 8]],
	'/control_sequence_409': ['/control', [16, 114], [127, 4, 0, 9]],
	'/control_sequence_410': ['/control', [16, 114], [127, 4, 1, 0]],
	'/control_sequence_411': ['/control', [16, 114], [127, 4, 1, 1]],
	'/control_sequence_412': ['/control', [16, 114], [127, 4, 1, 2]],
	'/control_sequence_413': ['/control', [16, 114], [127, 4, 1, 3]],
	'/control_sequence_414': ['/control', [16, 114], [127, 4, 1, 4]],
	'/control_sequence_415': ['/control', [16, 114], [127, 4, 1, 5]],
	'/control_sequence_416': ['/control', [16, 114], [127, 4, 1, 6]],
	'/control_sequence_417': ['/control', [16, 114], [127, 4, 1, 7]],
	'/control_sequence_418': ['/control', [16, 114], [127, 4, 1, 8]],
	'/control_sequence_419': ['/control', [16, 114], [127, 4, 1, 9]],
	'/control_sequence_420': ['/control', [16, 114], [127, 4, 2, 0]],
	'/control_sequence_421': ['/control', [16, 114], [127, 4, 2, 1]],
	'/control_sequence_422': ['/control', [16, 114], [127, 4, 2, 2]],
	'/control_sequence_423': ['/control', [16, 114], [127, 4, 2, 3]],
	'/control_sequence_424': ['/control', [16, 114], [127, 4, 2, 4]],
	'/control_sequence_425': ['/control', [16, 114], [127, 4, 2, 5]],
	'/control_sequence_426': ['/control', [16, 114], [127, 4, 2, 6]],
	'/control_sequence_427': ['/control', [16, 114], [127, 4, 2, 7]],
	'/control_sequence_428': ['/control', [16, 114], [127, 4, 2, 8]],
	'/control_sequence_429': ['/control', [16, 114], [127, 4, 2, 9]],
	'/control_sequence_430': ['/control', [16, 114], [127, 4, 3, 0]],
	'/control_sequence_431': ['/control', [16, 114], [127, 4, 3, 1]],
	'/control_sequence_432': ['/control', [16, 114], [127, 4, 3, 2]],
	'/control_sequence_433': ['/control', [16, 114], [127, 4, 3, 3]],
	'/control_sequence_434': ['/control', [16, 114], [127, 4, 3, 4]],
	'/control_sequence_435': ['/control', [16, 114], [127, 4, 3, 5]],
	'/control_sequence_436': ['/control', [16, 114], [127, 4, 3, 6]],
	'/control_sequence_437': ['/control', [16, 114], [127, 4, 3, 7]],
	'/control_sequence_438': ['/control', [16, 114], [127, 4, 3, 8]],
	'/control_sequence_439': ['/control', [16, 114], [127, 4, 3, 9]],
	'/control_sequence_440': ['/control', [16, 114], [127, 4, 4, 0]],
	'/control_sequence_441': ['/control', [16, 114], [127, 4, 4, 1]],
	'/control_sequence_442': ['/control', [16, 114], [127, 4, 4, 2]],
	'/control_sequence_443': ['/control', [16, 114], [127, 4, 4, 3]],
	'/control_sequence_444': ['/control', [16, 114], [127, 4, 4, 4]],
	'/control_sequence_445': ['/control', [16, 114], [127, 4, 4, 5]],
	'/control_sequence_446': ['/control', [16, 114], [127, 4, 4, 6]],
	'/control_sequence_447': ['/control', [16, 114], [127, 4, 4, 7]],
	'/control_sequence_448': ['/control', [16, 114], [127, 4, 4, 8]],
	'/control_sequence_449': ['/control', [16, 114], [127, 4, 4, 9]],
	'/control_sequence_450': ['/control', [16, 114], [127, 4, 5, 0]],
	'/control_sequence_451': ['/control', [16, 114], [127, 4, 5, 1]],
	'/control_sequence_452': ['/control', [16, 114], [127, 4, 5, 2]],
	'/control_sequence_453': ['/control', [16, 114], [127, 4, 5, 3]],
	'/control_sequence_454': ['/control', [16, 114], [127, 4, 5, 4]],
	'/control_sequence_455': ['/control', [16, 114], [127, 4, 5, 5]],
	'/control_sequence_456': ['/control', [16, 114], [127, 4, 5, 6]],
	'/control_sequence_457': ['/control', [16, 114], [127, 4, 5, 7]],
	'/control_sequence_458': ['/control', [16, 114], [127, 4, 5, 8]],
	'/control_sequence_459': ['/control', [16, 114], [127, 4, 5, 9]],
	'/control_sequence_460': ['/control', [16, 114], [127, 4, 6, 0]],
	'/control_sequence_461': ['/control', [16, 114], [127, 4, 6, 1]],
	'/control_sequence_462': ['/control', [16, 114], [127, 4, 6, 2]],
	'/control_sequence_463': ['/control', [16, 114], [127, 4, 6, 3]],
	'/control_sequence_464': ['/control', [16, 114], [127, 4, 6, 4]],
	'/control_sequence_465': ['/control', [16, 114], [127, 4, 6, 5]],
	'/control_sequence_466': ['/control', [16, 114], [127, 4, 6, 6]],
	'/control_sequence_467': ['/control', [16, 114], [127, 4, 6, 7]],
	'/control_sequence_468': ['/control', [16, 114], [127, 4, 6, 8]],
	'/control_sequence_469': ['/control', [16, 114], [127, 4, 6, 9]],
	'/control_sequence_470': ['/control', [16, 114], [127, 4, 7, 0]],
	'/control_sequence_471': ['/control', [16, 114], [127, 4, 7, 1]],
	'/control_sequence_472': ['/control', [16, 114], [127, 4, 7, 2]],
	'/control_sequence_473': ['/control', [16, 114], [127, 4, 7, 3]],
	'/control_sequence_474': ['/control', [16, 114], [127, 4, 7, 4]],
	'/control_sequence_475': ['/control', [16, 114], [127, 4, 7, 5]],
	'/control_sequence_476': ['/control', [16, 114], [127, 4, 7, 6]],
	'/control_sequence_477': ['/control', [16, 114], [127, 4, 7, 7]],
	'/control_sequence_478': ['/control', [16, 114], [127, 4, 7, 8]],
	'/control_sequence_479': ['/control', [16, 114], [127, 4, 7, 9]],
	'/control_sequence_480': ['/control', [16, 114], [127, 4, 8, 0]],
	'/control_sequence_481': ['/control', [16, 114], [127, 4, 8, 1]],
	'/control_sequence_482': ['/control', [16, 114], [127, 4, 8, 2]],
	'/control_sequence_483': ['/control', [16, 114], [127, 4, 8, 3]],
	'/control_sequence_484': ['/control', [16, 114], [127, 4, 8, 4]],
	'/control_sequence_485': ['/control', [16, 114], [127, 4, 8, 5]],
	'/control_sequence_486': ['/control', [16, 114], [127, 4, 8, 6]],
	'/control_sequence_487': ['/control', [16, 114], [127, 4, 8, 7]],
	'/control_sequence_488': ['/control', [16, 114], [127, 4, 8, 8]],
	'/control_sequence_489': ['/control', [16, 114], [127, 4, 8, 9]],
	'/control_sequence_490': ['/control', [16, 114], [127, 4, 9, 0]],
	'/control_sequence_491': ['/control', [16, 114], [127, 4, 9, 1]],
	'/control_sequence_492': ['/control', [16, 114], [127, 4, 9, 2]],
	'/control_sequence_493': ['/control', [16, 114], [127, 4, 9, 3]],
	'/control_sequence_494': ['/control', [16, 114], [127, 4, 9, 4]],
	'/control_sequence_495': ['/control', [16, 114], [127, 4, 9, 5]],
	'/control_sequence_496': ['/control', [16, 114], [127, 4, 9, 6]],
	'/control_sequence_497': ['/control', [16, 114], [127, 4, 9, 7]],
	'/control_sequence_498': ['/control', [16, 114], [127, 4, 9, 8]],
	'/control_sequence_499': ['/control', [16, 114], [127, 4, 9, 9]],
	'/control_sequence_500': ['/control', [16, 114], [127, 5, 0, 0]],
	'/control_sequence_501': ['/control', [16, 114], [127, 5, 0, 1]],
	'/control_sequence_502': ['/control', [16, 114], [127, 5, 0, 2]],
	'/control_sequence_503': ['/control', [16, 114], [127, 5, 0, 3]],
	'/control_sequence_504': ['/control', [16, 114], [127, 5, 0, 4]],
	'/control_sequence_505': ['/control', [16, 114], [127, 5, 0, 5]],
	'/control_sequence_506': ['/control', [16, 114], [127, 5, 0, 6]],
	'/control_sequence_507': ['/control', [16, 114], [127, 5, 0, 7]],
	'/control_sequence_508': ['/control', [16, 114], [127, 5, 0, 8]],
	'/control_sequence_509': ['/control', [16, 114], [127, 5, 0, 9]],
	'/control_sequence_510': ['/control', [16, 114], [127, 5, 1, 0]],
	'/control_sequence_511': ['/control', [16, 114], [127, 5, 1, 1]],
	'/control_sequence_512': ['/control', [16, 114], [127, 5, 1, 2]],
	'/control_sequence_513': ['/control', [16, 114], [127, 5, 1, 3]],
	'/control_sequence_514': ['/control', [16, 114], [127, 5, 1, 4]],
	'/control_sequence_515': ['/control', [16, 114], [127, 5, 1, 5]],
	'/control_sequence_516': ['/control', [16, 114], [127, 5, 1, 6]],
	'/control_sequence_517': ['/control', [16, 114], [127, 5, 1, 7]],
	'/control_sequence_518': ['/control', [16, 114], [127, 5, 1, 8]],
	'/control_sequence_519': ['/control', [16, 114], [127, 5, 1, 9]],
	'/control_sequence_520': ['/control', [16, 114], [127, 5, 2, 0]],
	'/control_sequence_521': ['/control', [16, 114], [127, 5, 2, 1]],
	'/control_sequence_522': ['/control', [16, 114], [127, 5, 2, 2]],
	'/control_sequence_523': ['/control', [16, 114], [127, 5, 2, 3]],
	'/control_sequence_524': ['/control', [16, 114], [127, 5, 2, 4]],
	'/control_sequence_525': ['/control', [16, 114], [127, 5, 2, 5]],
	'/control_sequence_526': ['/control', [16, 114], [127, 5, 2, 6]],
	'/control_sequence_527': ['/control', [16, 114], [127, 5, 2, 7]],
	'/control_sequence_528': ['/control', [16, 114], [127, 5, 2, 8]],
	'/control_sequence_529': ['/control', [16, 114], [127, 5, 2, 9]],
	'/control_sequence_530': ['/control', [16, 114], [127, 5, 3, 0]],
	'/control_sequence_531': ['/control', [16, 114], [127, 5, 3, 1]],
	'/control_sequence_532': ['/control', [16, 114], [127, 5, 3, 2]],
	'/control_sequence_533': ['/control', [16, 114], [127, 5, 3, 3]],
	'/control_sequence_534': ['/control', [16, 114], [127, 5, 3, 4]],
	'/control_sequence_535': ['/control', [16, 114], [127, 5, 3, 5]],
	'/control_sequence_536': ['/control', [16, 114], [127, 5, 3, 6]],
	'/control_sequence_537': ['/control', [16, 114], [127, 5, 3, 7]],
	'/control_sequence_538': ['/control', [16, 114], [127, 5, 3, 8]],
	'/control_sequence_539': ['/control', [16, 114], [127, 5, 3, 9]],
	'/control_sequence_540': ['/control', [16, 114], [127, 5, 4, 0]],
	'/control_sequence_541': ['/control', [16, 114], [127, 5, 4, 1]],
	'/control_sequence_542': ['/control', [16, 114], [127, 5, 4, 2]],
	'/control_sequence_543': ['/control', [16, 114], [127, 5, 4, 3]],
	'/control_sequence_544': ['/control', [16, 114], [127, 5, 4, 4]],
	'/control_sequence_545': ['/control', [16, 114], [127, 5, 4, 5]],
	'/control_sequence_546': ['/control', [16, 114], [127, 5, 4, 6]],
	'/control_sequence_547': ['/control', [16, 114], [127, 5, 4, 7]],
	'/control_sequence_548': ['/control', [16, 114], [127, 5, 4, 8]],
	'/control_sequence_549': ['/control', [16, 114], [127, 5, 4, 9]],
	'/control_sequence_550': ['/control', [16, 114], [127, 5, 5, 0]],
	'/control_sequence_551': ['/control', [16, 114], [127, 5, 5, 1]],
	'/control_sequence_552': ['/control', [16, 114], [127, 5, 5, 2]],
	'/control_sequence_553': ['/control', [16, 114], [127, 5, 5, 3]],
	'/control_sequence_554': ['/control', [16, 114], [127, 5, 5, 4]],
	'/control_sequence_555': ['/control', [16, 114], [127, 5, 5, 5]],
	'/control_sequence_556': ['/control', [16, 114], [127, 5, 5, 6]],
	'/control_sequence_557': ['/control', [16, 114], [127, 5, 5, 7]],
	'/control_sequence_558': ['/control', [16, 114], [127, 5, 5, 8]],
	'/control_sequence_559': ['/control', [16, 114], [127, 5, 5, 9]],
	'/control_sequence_560': ['/control', [16, 114], [127, 5, 6, 0]],
	'/control_sequence_561': ['/control', [16, 114], [127, 5, 6, 1]],
	'/control_sequence_562': ['/control', [16, 114], [127, 5, 6, 2]],
	'/control_sequence_563': ['/control', [16, 114], [127, 5, 6, 3]],
	'/control_sequence_564': ['/control', [16, 114], [127, 5, 6, 4]],
	'/control_sequence_565': ['/control', [16, 114], [127, 5, 6, 5]],
	'/control_sequence_566': ['/control', [16, 114], [127, 5, 6, 6]],
	'/control_sequence_567': ['/control', [16, 114], [127, 5, 6, 7]],
	'/control_sequence_568': ['/control', [16, 114], [127, 5, 6, 8]],
	'/control_sequence_569': ['/control', [16, 114], [127, 5, 6, 9]],
	'/control_sequence_570': ['/control', [16, 114], [127, 5, 7, 0]],
	'/control_sequence_571': ['/control', [16, 114], [127, 5, 7, 1]],
	'/control_sequence_572': ['/control', [16, 114], [127, 5, 7, 2]],
	'/control_sequence_573': ['/control', [16, 114], [127, 5, 7, 3]],
	'/control_sequence_574': ['/control', [16, 114], [127, 5, 7, 4]],
	'/control_sequence_575': ['/control', [16, 114], [127, 5, 7, 5]],
	'/control_sequence_576': ['/control', [16, 114], [127, 5, 7, 6]],
	'/control_sequence_577': ['/control', [16, 114], [127, 5, 7, 7]],
	'/control_sequence_578': ['/control', [16, 114], [127, 5, 7, 8]],
	'/control_sequence_579': ['/control', [16, 114], [127, 5, 7, 9]],
	'/control_sequence_580': ['/control', [16, 114], [127, 5, 8, 0]],
	'/control_sequence_581': ['/control', [16, 114], [127, 5, 8, 1]],
	'/control_sequence_582': ['/control', [16, 114], [127, 5, 8, 2]],
	'/control_sequence_583': ['/control', [16, 114], [127, 5, 8, 3]],
	'/control_sequence_584': ['/control', [16, 114], [127, 5, 8, 4]],
	'/control_sequence_585': ['/control', [16, 114], [127, 5, 8, 5]],
	'/control_sequence_586': ['/control', [16, 114], [127, 5, 8, 6]],
	'/control_sequence_587': ['/control', [16, 114], [127, 5, 8, 7]],
	'/control_sequence_588': ['/control', [16, 114], [127, 5, 8, 8]],
	'/control_sequence_589': ['/control', [16, 114], [127, 5, 8, 9]],
	'/control_sequence_590': ['/control', [16, 114], [127, 5, 9, 0]],
	'/control_sequence_591': ['/control', [16, 114], [127, 5, 9, 1]],
	'/control_sequence_592': ['/control', [16, 114], [127, 5, 9, 2]],
	'/control_sequence_593': ['/control', [16, 114], [127, 5, 9, 3]],
	'/control_sequence_594': ['/control', [16, 114], [127, 5, 9, 4]],
	'/control_sequence_595': ['/control', [16, 114], [127, 5, 9, 5]],
	'/control_sequence_596': ['/control', [16, 114], [127, 5, 9, 6]],
	'/control_sequence_597': ['/control', [16, 114], [127, 5, 9, 7]],
	'/control_sequence_598': ['/control', [16, 114], [127, 5, 9, 8]],
	'/control_sequence_599': ['/control', [16, 114], [127, 5, 9, 9]],
	'/control_sequence_600': ['/control', [16, 114], [127, 6, 0, 0]],
	'/control_sequence_601': ['/control', [16, 114], [127, 6, 0, 1]],
	'/control_sequence_602': ['/control', [16, 114], [127, 6, 0, 2]],
	'/control_sequence_603': ['/control', [16, 114], [127, 6, 0, 3]],
	'/control_sequence_604': ['/control', [16, 114], [127, 6, 0, 4]],
	'/control_sequence_605': ['/control', [16, 114], [127, 6, 0, 5]],
	'/control_sequence_606': ['/control', [16, 114], [127, 6, 0, 6]],
	'/control_sequence_607': ['/control', [16, 114], [127, 6, 0, 7]],
	'/control_sequence_608': ['/control', [16, 114], [127, 6, 0, 8]],
	'/control_sequence_609': ['/control', [16, 114], [127, 6, 0, 9]],
	'/control_sequence_610': ['/control', [16, 114], [127, 6, 1, 0]],
	'/control_sequence_611': ['/control', [16, 114], [127, 6, 1, 1]],
	'/control_sequence_612': ['/control', [16, 114], [127, 6, 1, 2]],
	'/control_sequence_613': ['/control', [16, 114], [127, 6, 1, 3]],
	'/control_sequence_614': ['/control', [16, 114], [127, 6, 1, 4]],
	'/control_sequence_615': ['/control', [16, 114], [127, 6, 1, 5]],
	'/control_sequence_616': ['/control', [16, 114], [127, 6, 1, 6]],
	'/control_sequence_617': ['/control', [16, 114], [127, 6, 1, 7]],
	'/control_sequence_618': ['/control', [16, 114], [127, 6, 1, 8]],
	'/control_sequence_619': ['/control', [16, 114], [127, 6, 1, 9]],
	'/control_sequence_620': ['/control', [16, 114], [127, 6, 2, 0]],
	'/control_sequence_621': ['/control', [16, 114], [127, 6, 2, 1]],
	'/control_sequence_622': ['/control', [16, 114], [127, 6, 2, 2]],
	'/control_sequence_623': ['/control', [16, 114], [127, 6, 2, 3]],
	'/control_sequence_624': ['/control', [16, 114], [127, 6, 2, 4]],
	'/control_sequence_625': ['/control', [16, 114], [127, 6, 2, 5]],
	'/control_sequence_626': ['/control', [16, 114], [127, 6, 2, 6]],
	'/control_sequence_627': ['/control', [16, 114], [127, 6, 2, 7]],
	'/control_sequence_628': ['/control', [16, 114], [127, 6, 2, 8]],
	'/control_sequence_629': ['/control', [16, 114], [127, 6, 2, 9]],
	'/control_sequence_630': ['/control', [16, 114], [127, 6, 3, 0]],
	'/control_sequence_631': ['/control', [16, 114], [127, 6, 3, 1]],
	'/control_sequence_632': ['/control', [16, 114], [127, 6, 3, 2]],
	'/control_sequence_633': ['/control', [16, 114], [127, 6, 3, 3]],
	'/control_sequence_634': ['/control', [16, 114], [127, 6, 3, 4]],
	'/control_sequence_635': ['/control', [16, 114], [127, 6, 3, 5]],
	'/control_sequence_636': ['/control', [16, 114], [127, 6, 3, 6]],
	'/control_sequence_637': ['/control', [16, 114], [127, 6, 3, 7]],
	'/control_sequence_638': ['/control', [16, 114], [127, 6, 3, 8]],
	'/control_sequence_639': ['/control', [16, 114], [127, 6, 3, 9]],
	'/control_sequence_640': ['/control', [16, 114], [127, 6, 4, 0]],
	'/control_sequence_641': ['/control', [16, 114], [127, 6, 4, 1]],
	'/control_sequence_642': ['/control', [16, 114], [127, 6, 4, 2]],
	'/control_sequence_643': ['/control', [16, 114], [127, 6, 4, 3]],
	'/control_sequence_644': ['/control', [16, 114], [127, 6, 4, 4]],
	'/control_sequence_645': ['/control', [16, 114], [127, 6, 4, 5]],
	'/control_sequence_646': ['/control', [16, 114], [127, 6, 4, 6]],
	'/control_sequence_647': ['/control', [16, 114], [127, 6, 4, 7]],
	'/control_sequence_648': ['/control', [16, 114], [127, 6, 4, 8]],
	'/control_sequence_649': ['/control', [16, 114], [127, 6, 4, 9]],
	'/control_sequence_650': ['/control', [16, 114], [127, 6, 5, 0]],
	'/control_sequence_651': ['/control', [16, 114], [127, 6, 5, 1]],
	'/control_sequence_652': ['/control', [16, 114], [127, 6, 5, 2]],
	'/control_sequence_653': ['/control', [16, 114], [127, 6, 5, 3]],
	'/control_sequence_654': ['/control', [16, 114], [127, 6, 5, 4]],
	'/control_sequence_655': ['/control', [16, 114], [127, 6, 5, 5]],
	'/control_sequence_656': ['/control', [16, 114], [127, 6, 5, 6]],
	'/control_sequence_657': ['/control', [16, 114], [127, 6, 5, 7]],
	'/control_sequence_658': ['/control', [16, 114], [127, 6, 5, 8]],
	'/control_sequence_659': ['/control', [16, 114], [127, 6, 5, 9]],
	'/control_sequence_660': ['/control', [16, 114], [127, 6, 6, 0]],
	'/control_sequence_661': ['/control', [16, 114], [127, 6, 6, 1]],
	'/control_sequence_662': ['/control', [16, 114], [127, 6, 6, 2]],
	'/control_sequence_663': ['/control', [16, 114], [127, 6, 6, 3]],
	'/control_sequence_664': ['/control', [16, 114], [127, 6, 6, 4]],
	'/control_sequence_665': ['/control', [16, 114], [127, 6, 6, 5]],
	'/control_sequence_666': ['/control', [16, 114], [127, 6, 6, 6]],
	'/control_sequence_667': ['/control', [16, 114], [127, 6, 6, 7]],
	'/control_sequence_668': ['/control', [16, 114], [127, 6, 6, 8]],
	'/control_sequence_669': ['/control', [16, 114], [127, 6, 6, 9]],
	'/control_sequence_670': ['/control', [16, 114], [127, 6, 7, 0]],
	'/control_sequence_671': ['/control', [16, 114], [127, 6, 7, 1]],
	'/control_sequence_672': ['/control', [16, 114], [127, 6, 7, 2]],
	'/control_sequence_673': ['/control', [16, 114], [127, 6, 7, 3]],
	'/control_sequence_674': ['/control', [16, 114], [127, 6, 7, 4]],
	'/control_sequence_675': ['/control', [16, 114], [127, 6, 7, 5]],
	'/control_sequence_676': ['/control', [16, 114], [127, 6, 7, 6]],
	'/control_sequence_677': ['/control', [16, 114], [127, 6, 7, 7]],
	'/control_sequence_678': ['/control', [16, 114], [127, 6, 7, 8]],
	'/control_sequence_679': ['/control', [16, 114], [127, 6, 7, 9]],
	'/control_sequence_680': ['/control', [16, 114], [127, 6, 8, 0]],
	'/control_sequence_681': ['/control', [16, 114], [127, 6, 8, 1]],
	'/control_sequence_682': ['/control', [16, 114], [127, 6, 8, 2]],
	'/control_sequence_683': ['/control', [16, 114], [127, 6, 8, 3]],
	'/control_sequence_684': ['/control', [16, 114], [127, 6, 8, 4]],
	'/control_sequence_685': ['/control', [16, 114], [127, 6, 8, 5]],
	'/control_sequence_686': ['/control', [16, 114], [127, 6, 8, 6]],
	'/control_sequence_687': ['/control', [16, 114], [127, 6, 8, 7]],
	'/control_sequence_688': ['/control', [16, 114], [127, 6, 8, 8]],
	'/control_sequence_689': ['/control', [16, 114], [127, 6, 8, 9]],
	'/control_sequence_690': ['/control', [16, 114], [127, 6, 9, 0]],
	'/control_sequence_691': ['/control', [16, 114], [127, 6, 9, 1]],
	'/control_sequence_692': ['/control', [16, 114], [127, 6, 9, 2]],
	'/control_sequence_693': ['/control', [16, 114], [127, 6, 9, 3]],
	'/control_sequence_694': ['/control', [16, 114], [127, 6, 9, 4]],
	'/control_sequence_695': ['/control', [16, 114], [127, 6, 9, 5]],
	'/control_sequence_696': ['/control', [16, 114], [127, 6, 9, 6]],
	'/control_sequence_697': ['/control', [16, 114], [127, 6, 9, 7]],
	'/control_sequence_698': ['/control', [16, 114], [127, 6, 9, 8]],
	'/control_sequence_699': ['/control', [16, 114], [127, 6, 9, 9]],
	'/control_sequence_700': ['/control', [16, 114], [127, 7, 0, 0]],
	'/control_sequence_701': ['/control', [16, 114], [127, 7, 0, 1]],
	'/control_sequence_702': ['/control', [16, 114], [127, 7, 0, 2]],
	'/control_sequence_703': ['/control', [16, 114], [127, 7, 0, 3]],
	'/control_sequence_704': ['/control', [16, 114], [127, 7, 0, 4]],
	'/control_sequence_705': ['/control', [16, 114], [127, 7, 0, 5]],
	'/control_sequence_706': ['/control', [16, 114], [127, 7, 0, 6]],
	'/control_sequence_707': ['/control', [16, 114], [127, 7, 0, 7]],
	'/control_sequence_708': ['/control', [16, 114], [127, 7, 0, 8]],
	'/control_sequence_709': ['/control', [16, 114], [127, 7, 0, 9]],
	'/control_sequence_710': ['/control', [16, 114], [127, 7, 1, 0]],
	'/control_sequence_711': ['/control', [16, 114], [127, 7, 1, 1]],
	'/control_sequence_712': ['/control', [16, 114], [127, 7, 1, 2]],
	'/control_sequence_713': ['/control', [16, 114], [127, 7, 1, 3]],
	'/control_sequence_714': ['/control', [16, 114], [127, 7, 1, 4]],
	'/control_sequence_715': ['/control', [16, 114], [127, 7, 1, 5]],
	'/control_sequence_716': ['/control', [16, 114], [127, 7, 1, 6]],
	'/control_sequence_717': ['/control', [16, 114], [127, 7, 1, 7]],
	'/control_sequence_718': ['/control', [16, 114], [127, 7, 1, 8]],
	'/control_sequence_719': ['/control', [16, 114], [127, 7, 1, 9]],
	'/control_sequence_720': ['/control', [16, 114], [127, 7, 2, 0]],
	'/control_sequence_721': ['/control', [16, 114], [127, 7, 2, 1]],
	'/control_sequence_722': ['/control', [16, 114], [127, 7, 2, 2]],
	'/control_sequence_723': ['/control', [16, 114], [127, 7, 2, 3]],
	'/control_sequence_724': ['/control', [16, 114], [127, 7, 2, 4]],
	'/control_sequence_725': ['/control', [16, 114], [127, 7, 2, 5]],
	'/control_sequence_726': ['/control', [16, 114], [127, 7, 2, 6]],
	'/control_sequence_727': ['/control', [16, 114], [127, 7, 2, 7]],
	'/control_sequence_728': ['/control', [16, 114], [127, 7, 2, 8]],
	'/control_sequence_729': ['/control', [16, 114], [127, 7, 2, 9]],
	'/control_sequence_730': ['/control', [16, 114], [127, 7, 3, 0]],
	'/control_sequence_731': ['/control', [16, 114], [127, 7, 3, 1]],
	'/control_sequence_732': ['/control', [16, 114], [127, 7, 3, 2]],
	'/control_sequence_733': ['/control', [16, 114], [127, 7, 3, 3]],
	'/control_sequence_734': ['/control', [16, 114], [127, 7, 3, 4]],
	'/control_sequence_735': ['/control', [16, 114], [127, 7, 3, 5]],
	'/control_sequence_736': ['/control', [16, 114], [127, 7, 3, 6]],
	'/control_sequence_737': ['/control', [16, 114], [127, 7, 3, 7]],
	'/control_sequence_738': ['/control', [16, 114], [127, 7, 3, 8]],
	'/control_sequence_739': ['/control', [16, 114], [127, 7, 3, 9]],
	'/control_sequence_740': ['/control', [16, 114], [127, 7, 4, 0]],
	'/control_sequence_741': ['/control', [16, 114], [127, 7, 4, 1]],
	'/control_sequence_742': ['/control', [16, 114], [127, 7, 4, 2]],
	'/control_sequence_743': ['/control', [16, 114], [127, 7, 4, 3]],
	'/control_sequence_744': ['/control', [16, 114], [127, 7, 4, 4]],
	'/control_sequence_745': ['/control', [16, 114], [127, 7, 4, 5]],
	'/control_sequence_746': ['/control', [16, 114], [127, 7, 4, 6]],
	'/control_sequence_747': ['/control', [16, 114], [127, 7, 4, 7]],
	'/control_sequence_748': ['/control', [16, 114], [127, 7, 4, 8]],
	'/control_sequence_749': ['/control', [16, 114], [127, 7, 4, 9]],
	'/control_sequence_750': ['/control', [16, 114], [127, 7, 5, 0]],
	'/control_sequence_751': ['/control', [16, 114], [127, 7, 5, 1]],
	'/control_sequence_752': ['/control', [16, 114], [127, 7, 5, 2]],
	'/control_sequence_753': ['/control', [16, 114], [127, 7, 5, 3]],
	'/control_sequence_754': ['/control', [16, 114], [127, 7, 5, 4]],
	'/control_sequence_755': ['/control', [16, 114], [127, 7, 5, 5]],
	'/control_sequence_756': ['/control', [16, 114], [127, 7, 5, 6]],
	'/control_sequence_757': ['/control', [16, 114], [127, 7, 5, 7]],
	'/control_sequence_758': ['/control', [16, 114], [127, 7, 5, 8]],
	'/control_sequence_759': ['/control', [16, 114], [127, 7, 5, 9]],
	'/control_sequence_760': ['/control', [16, 114], [127, 7, 6, 0]],
	'/control_sequence_761': ['/control', [16, 114], [127, 7, 6, 1]],
	'/control_sequence_762': ['/control', [16, 114], [127, 7, 6, 2]],
	'/control_sequence_763': ['/control', [16, 114], [127, 7, 6, 3]],
	'/control_sequence_764': ['/control', [16, 114], [127, 7, 6, 4]],
	'/control_sequence_765': ['/control', [16, 114], [127, 7, 6, 5]],
	'/control_sequence_766': ['/control', [16, 114], [127, 7, 6, 6]],
	'/control_sequence_767': ['/control', [16, 114], [127, 7, 6, 7]],
	'/control_sequence_768': ['/control', [16, 114], [127, 7, 6, 8]],
	'/control_sequence_769': ['/control', [16, 114], [127, 7, 6, 9]],
	'/control_sequence_770': ['/control', [16, 114], [127, 7, 7, 0]],
	'/control_sequence_771': ['/control', [16, 114], [127, 7, 7, 1]],
	'/control_sequence_772': ['/control', [16, 114], [127, 7, 7, 2]],
	'/control_sequence_773': ['/control', [16, 114], [127, 7, 7, 3]],
	'/control_sequence_774': ['/control', [16, 114], [127, 7, 7, 4]],
	'/control_sequence_775': ['/control', [16, 114], [127, 7, 7, 5]],
	'/control_sequence_776': ['/control', [16, 114], [127, 7, 7, 6]],
	'/control_sequence_777': ['/control', [16, 114], [127, 7, 7, 7]],
	'/control_sequence_778': ['/control', [16, 114], [127, 7, 7, 8]],
	'/control_sequence_779': ['/control', [16, 114], [127, 7, 7, 9]],
	'/control_sequence_780': ['/control', [16, 114], [127, 7, 8, 0]],
	'/control_sequence_781': ['/control', [16, 114], [127, 7, 8, 1]],
	'/control_sequence_782': ['/control', [16, 114], [127, 7, 8, 2]],
	'/control_sequence_783': ['/control', [16, 114], [127, 7, 8, 3]],
	'/control_sequence_784': ['/control', [16, 114], [127, 7, 8, 4]],
	'/control_sequence_785': ['/control', [16, 114], [127, 7, 8, 5]],
	'/control_sequence_786': ['/control', [16, 114], [127, 7, 8, 6]],
	'/control_sequence_787': ['/control', [16, 114], [127, 7, 8, 7]],
	'/control_sequence_788': ['/control', [16, 114], [127, 7, 8, 8]],
	'/control_sequence_789': ['/control', [16, 114], [127, 7, 8, 9]],
	'/control_sequence_790': ['/control', [16, 114], [127, 7, 9, 0]],
	'/control_sequence_791': ['/control', [16, 114], [127, 7, 9, 1]],
	'/control_sequence_792': ['/control', [16, 114], [127, 7, 9, 2]],
	'/control_sequence_793': ['/control', [16, 114], [127, 7, 9, 3]],
	'/control_sequence_794': ['/control', [16, 114], [127, 7, 9, 4]],
	'/control_sequence_795': ['/control', [16, 114], [127, 7, 9, 5]],
	'/control_sequence_796': ['/control', [16, 114], [127, 7, 9, 6]],
	'/control_sequence_797': ['/control', [16, 114], [127, 7, 9, 7]],
	'/control_sequence_798': ['/control', [16, 114], [127, 7, 9, 8]],
	'/control_sequence_799': ['/control', [16, 114], [127, 7, 9, 9]],
	'/control_sequence_800': ['/control', [16, 114], [127, 8, 0, 0]],
	'/control_sequence_801': ['/control', [16, 114], [127, 8, 0, 1]],
	'/control_sequence_802': ['/control', [16, 114], [127, 8, 0, 2]],
	'/control_sequence_803': ['/control', [16, 114], [127, 8, 0, 3]],
	'/control_sequence_804': ['/control', [16, 114], [127, 8, 0, 4]],
	'/control_sequence_805': ['/control', [16, 114], [127, 8, 0, 5]],
	'/control_sequence_806': ['/control', [16, 114], [127, 8, 0, 6]],
	'/control_sequence_807': ['/control', [16, 114], [127, 8, 0, 7]],
	'/control_sequence_808': ['/control', [16, 114], [127, 8, 0, 8]],
	'/control_sequence_809': ['/control', [16, 114], [127, 8, 0, 9]],
	'/control_sequence_810': ['/control', [16, 114], [127, 8, 1, 0]],
	'/control_sequence_811': ['/control', [16, 114], [127, 8, 1, 1]],
	'/control_sequence_812': ['/control', [16, 114], [127, 8, 1, 2]],
	'/control_sequence_813': ['/control', [16, 114], [127, 8, 1, 3]],
	'/control_sequence_814': ['/control', [16, 114], [127, 8, 1, 4]],
	'/control_sequence_815': ['/control', [16, 114], [127, 8, 1, 5]],
	'/control_sequence_816': ['/control', [16, 114], [127, 8, 1, 6]],
	'/control_sequence_817': ['/control', [16, 114], [127, 8, 1, 7]],
	'/control_sequence_818': ['/control', [16, 114], [127, 8, 1, 8]],
	'/control_sequence_819': ['/control', [16, 114], [127, 8, 1, 9]],
	'/control_sequence_820': ['/control', [16, 114], [127, 8, 2, 0]],
	'/control_sequence_821': ['/control', [16, 114], [127, 8, 2, 1]],
	'/control_sequence_822': ['/control', [16, 114], [127, 8, 2, 2]],
	'/control_sequence_823': ['/control', [16, 114], [127, 8, 2, 3]],
	'/control_sequence_824': ['/control', [16, 114], [127, 8, 2, 4]],
	'/control_sequence_825': ['/control', [16, 114], [127, 8, 2, 5]],
	'/control_sequence_826': ['/control', [16, 114], [127, 8, 2, 6]],
	'/control_sequence_827': ['/control', [16, 114], [127, 8, 2, 7]],
	'/control_sequence_828': ['/control', [16, 114], [127, 8, 2, 8]],
	'/control_sequence_829': ['/control', [16, 114], [127, 8, 2, 9]],
	'/control_sequence_830': ['/control', [16, 114], [127, 8, 3, 0]],
	'/control_sequence_831': ['/control', [16, 114], [127, 8, 3, 1]],
	'/control_sequence_832': ['/control', [16, 114], [127, 8, 3, 2]],
	'/control_sequence_833': ['/control', [16, 114], [127, 8, 3, 3]],
	'/control_sequence_834': ['/control', [16, 114], [127, 8, 3, 4]],
	'/control_sequence_835': ['/control', [16, 114], [127, 8, 3, 5]],
	'/control_sequence_836': ['/control', [16, 114], [127, 8, 3, 6]],
	'/control_sequence_837': ['/control', [16, 114], [127, 8, 3, 7]],
	'/control_sequence_838': ['/control', [16, 114], [127, 8, 3, 8]],
	'/control_sequence_839': ['/control', [16, 114], [127, 8, 3, 9]],
	'/control_sequence_840': ['/control', [16, 114], [127, 8, 4, 0]],
	'/control_sequence_841': ['/control', [16, 114], [127, 8, 4, 1]],
	'/control_sequence_842': ['/control', [16, 114], [127, 8, 4, 2]],
	'/control_sequence_843': ['/control', [16, 114], [127, 8, 4, 3]],
	'/control_sequence_844': ['/control', [16, 114], [127, 8, 4, 4]],
	'/control_sequence_845': ['/control', [16, 114], [127, 8, 4, 5]],
	'/control_sequence_846': ['/control', [16, 114], [127, 8, 4, 6]],
	'/control_sequence_847': ['/control', [16, 114], [127, 8, 4, 7]],
	'/control_sequence_848': ['/control', [16, 114], [127, 8, 4, 8]],
	'/control_sequence_849': ['/control', [16, 114], [127, 8, 4, 9]],
	'/control_sequence_850': ['/control', [16, 114], [127, 8, 5, 0]],
	'/control_sequence_851': ['/control', [16, 114], [127, 8, 5, 1]],
	'/control_sequence_852': ['/control', [16, 114], [127, 8, 5, 2]],
	'/control_sequence_853': ['/control', [16, 114], [127, 8, 5, 3]],
	'/control_sequence_854': ['/control', [16, 114], [127, 8, 5, 4]],
	'/control_sequence_855': ['/control', [16, 114], [127, 8, 5, 5]],
	'/control_sequence_856': ['/control', [16, 114], [127, 8, 5, 6]],
	'/control_sequence_857': ['/control', [16, 114], [127, 8, 5, 7]],
	'/control_sequence_858': ['/control', [16, 114], [127, 8, 5, 8]],
	'/control_sequence_859': ['/control', [16, 114], [127, 8, 5, 9]],
	'/control_sequence_860': ['/control', [16, 114], [127, 8, 6, 0]],
	'/control_sequence_861': ['/control', [16, 114], [127, 8, 6, 1]],
	'/control_sequence_862': ['/control', [16, 114], [127, 8, 6, 2]],
	'/control_sequence_863': ['/control', [16, 114], [127, 8, 6, 3]],
	'/control_sequence_864': ['/control', [16, 114], [127, 8, 6, 4]],
	'/control_sequence_865': ['/control', [16, 114], [127, 8, 6, 5]],
	'/control_sequence_866': ['/control', [16, 114], [127, 8, 6, 6]],
	'/control_sequence_867': ['/control', [16, 114], [127, 8, 6, 7]],
	'/control_sequence_868': ['/control', [16, 114], [127, 8, 6, 8]],
	'/control_sequence_869': ['/control', [16, 114], [127, 8, 6, 9]],
	'/control_sequence_870': ['/control', [16, 114], [127, 8, 7, 0]],
	'/control_sequence_871': ['/control', [16, 114], [127, 8, 7, 1]],
	'/control_sequence_872': ['/control', [16, 114], [127, 8, 7, 2]],
	'/control_sequence_873': ['/control', [16, 114], [127, 8, 7, 3]],
	'/control_sequence_874': ['/control', [16, 114], [127, 8, 7, 4]],
	'/control_sequence_875': ['/control', [16, 114], [127, 8, 7, 5]],
	'/control_sequence_876': ['/control', [16, 114], [127, 8, 7, 6]],
	'/control_sequence_877': ['/control', [16, 114], [127, 8, 7, 7]],
	'/control_sequence_878': ['/control', [16, 114], [127, 8, 7, 8]],
	'/control_sequence_879': ['/control', [16, 114], [127, 8, 7, 9]],
	'/control_sequence_880': ['/control', [16, 114], [127, 8, 8, 0]],
	'/control_sequence_881': ['/control', [16, 114], [127, 8, 8, 1]],
	'/control_sequence_882': ['/control', [16, 114], [127, 8, 8, 2]],
	'/control_sequence_883': ['/control', [16, 114], [127, 8, 8, 3]],
	'/control_sequence_884': ['/control', [16, 114], [127, 8, 8, 4]],
	'/control_sequence_885': ['/control', [16, 114], [127, 8, 8, 5]],
	'/control_sequence_886': ['/control', [16, 114], [127, 8, 8, 6]],
	'/control_sequence_887': ['/control', [16, 114], [127, 8, 8, 7]],
	'/control_sequence_888': ['/control', [16, 114], [127, 8, 8, 8]],
	'/control_sequence_889': ['/control', [16, 114], [127, 8, 8, 9]],
	'/control_sequence_890': ['/control', [16, 114], [127, 8, 9, 0]],
	'/control_sequence_891': ['/control', [16, 114], [127, 8, 9, 1]],
	'/control_sequence_892': ['/control', [16, 114], [127, 8, 9, 2]],
	'/control_sequence_893': ['/control', [16, 114], [127, 8, 9, 3]],
	'/control_sequence_894': ['/control', [16, 114], [127, 8, 9, 4]],
	'/control_sequence_895': ['/control', [16, 114], [127, 8, 9, 5]],
	'/control_sequence_896': ['/control', [16, 114], [127, 8, 9, 6]],
	'/control_sequence_897': ['/control', [16, 114], [127, 8, 9, 7]],
	'/control_sequence_898': ['/control', [16, 114], [127, 8, 9, 8]],
	'/control_sequence_899': ['/control', [16, 114], [127, 8, 9, 9]],
	'/control_sequence_900': ['/control', [16, 114], [127, 9, 0, 0]],
	'/control_sequence_901': ['/control', [16, 114], [127, 9, 0, 1]],
	'/control_sequence_902': ['/control', [16, 114], [127, 9, 0, 2]],
	'/control_sequence_903': ['/control', [16, 114], [127, 9, 0, 3]],
	'/control_sequence_904': ['/control', [16, 114], [127, 9, 0, 4]],
	'/control_sequence_905': ['/control', [16, 114], [127, 9, 0, 5]],
	'/control_sequence_906': ['/control', [16, 114], [127, 9, 0, 6]],
	'/control_sequence_907': ['/control', [16, 114], [127, 9, 0, 7]],
	'/control_sequence_908': ['/control', [16, 114], [127, 9, 0, 8]],
	'/control_sequence_909': ['/control', [16, 114], [127, 9, 0, 9]],
	'/control_sequence_910': ['/control', [16, 114], [127, 9, 1, 0]],
	'/control_sequence_911': ['/control', [16, 114], [127, 9, 1, 1]],
	'/control_sequence_912': ['/control', [16, 114], [127, 9, 1, 2]],
	'/control_sequence_913': ['/control', [16, 114], [127, 9, 1, 3]],
	'/control_sequence_914': ['/control', [16, 114], [127, 9, 1, 4]],
	'/control_sequence_915': ['/control', [16, 114], [127, 9, 1, 5]],
	'/control_sequence_916': ['/control', [16, 114], [127, 9, 1, 6]],
	'/control_sequence_917': ['/control', [16, 114], [127, 9, 1, 7]],
	'/control_sequence_918': ['/control', [16, 114], [127, 9, 1, 8]],
	'/control_sequence_919': ['/control', [16, 114], [127, 9, 1, 9]],
	'/control_sequence_920': ['/control', [16, 114], [127, 9, 2, 0]],
	'/control_sequence_921': ['/control', [16, 114], [127, 9, 2, 1]],
	'/control_sequence_922': ['/control', [16, 114], [127, 9, 2, 2]],
	'/control_sequence_923': ['/control', [16, 114], [127, 9, 2, 3]],
	'/control_sequence_924': ['/control', [16, 114], [127, 9, 2, 4]],
	'/control_sequence_925': ['/control', [16, 114], [127, 9, 2, 5]],
	'/control_sequence_926': ['/control', [16, 114], [127, 9, 2, 6]],
	'/control_sequence_927': ['/control', [16, 114], [127, 9, 2, 7]],
	'/control_sequence_928': ['/control', [16, 114], [127, 9, 2, 8]],
	'/control_sequence_929': ['/control', [16, 114], [127, 9, 2, 9]],
	'/control_sequence_930': ['/control', [16, 114], [127, 9, 3, 0]],
	'/control_sequence_931': ['/control', [16, 114], [127, 9, 3, 1]],
	'/control_sequence_932': ['/control', [16, 114], [127, 9, 3, 2]],
	'/control_sequence_933': ['/control', [16, 114], [127, 9, 3, 3]],
	'/control_sequence_934': ['/control', [16, 114], [127, 9, 3, 4]],
	'/control_sequence_935': ['/control', [16, 114], [127, 9, 3, 5]],
	'/control_sequence_936': ['/control', [16, 114], [127, 9, 3, 6]],
	'/control_sequence_937': ['/control', [16, 114], [127, 9, 3, 7]],
	'/control_sequence_938': ['/control', [16, 114], [127, 9, 3, 8]],
	'/control_sequence_939': ['/control', [16, 114], [127, 9, 3, 9]],
	'/control_sequence_940': ['/control', [16, 114], [127, 9, 4, 0]],
	'/control_sequence_941': ['/control', [16, 114], [127, 9, 4, 1]],
	'/control_sequence_942': ['/control', [16, 114], [127, 9, 4, 2]],
	'/control_sequence_943': ['/control', [16, 114], [127, 9, 4, 3]],
	'/control_sequence_944': ['/control', [16, 114], [127, 9, 4, 4]],
	'/control_sequence_945': ['/control', [16, 114], [127, 9, 4, 5]],
	'/control_sequence_946': ['/control', [16, 114], [127, 9, 4, 6]],
	'/control_sequence_947': ['/control', [16, 114], [127, 9, 4, 7]],
	'/control_sequence_948': ['/control', [16, 114], [127, 9, 4, 8]],
	'/control_sequence_949': ['/control', [16, 114], [127, 9, 4, 9]],
	'/control_sequence_950': ['/control', [16, 114], [127, 9, 5, 0]],
	'/control_sequence_951': ['/control', [16, 114], [127, 9, 5, 1]],
	'/control_sequence_952': ['/control', [16, 114], [127, 9, 5, 2]],
	'/control_sequence_953': ['/control', [16, 114], [127, 9, 5, 3]],
	'/control_sequence_954': ['/control', [16, 114], [127, 9, 5, 4]],
	'/control_sequence_955': ['/control', [16, 114], [127, 9, 5, 5]],
	'/control_sequence_956': ['/control', [16, 114], [127, 9, 5, 6]],
	'/control_sequence_957': ['/control', [16, 114], [127, 9, 5, 7]],
	'/control_sequence_958': ['/control', [16, 114], [127, 9, 5, 8]],
	'/control_sequence_959': ['/control', [16, 114], [127, 9, 5, 9]],
	'/control_sequence_960': ['/control', [16, 114], [127, 9, 6, 0]],
	'/control_sequence_961': ['/control', [16, 114], [127, 9, 6, 1]],
	'/control_sequence_962': ['/control', [16, 114], [127, 9, 6, 2]],
	'/control_sequence_963': ['/control', [16, 114], [127, 9, 6, 3]],
	'/control_sequence_964': ['/control', [16, 114], [127, 9, 6, 4]],
	'/control_sequence_965': ['/control', [16, 114], [127, 9, 6, 5]],
	'/control_sequence_966': ['/control', [16, 114], [127, 9, 6, 6]],
	'/control_sequence_967': ['/control', [16, 114], [127, 9, 6, 7]],
	'/control_sequence_968': ['/control', [16, 114], [127, 9, 6, 8]],
	'/control_sequence_969': ['/control', [16, 114], [127, 9, 6, 9]],
	'/control_sequence_970': ['/control', [16, 114], [127, 9, 7, 0]],
	'/control_sequence_971': ['/control', [16, 114], [127, 9, 7, 1]],
	'/control_sequence_972': ['/control', [16, 114], [127, 9, 7, 2]],
	'/control_sequence_973': ['/control', [16, 114], [127, 9, 7, 3]],
	'/control_sequence_974': ['/control', [16, 114], [127, 9, 7, 4]],
	'/control_sequence_975': ['/control', [16, 114], [127, 9, 7, 5]],
	'/control_sequence_976': ['/control', [16, 114], [127, 9, 7, 6]],
	'/control_sequence_977': ['/control', [16, 114], [127, 9, 7, 7]],
	'/control_sequence_978': ['/control', [16, 114], [127, 9, 7, 8]],
	'/control_sequence_979': ['/control', [16, 114], [127, 9, 7, 9]],
	'/control_sequence_980': ['/control', [16, 114], [127, 9, 8, 0]],
	'/control_sequence_981': ['/control', [16, 114], [127, 9, 8, 1]],
	'/control_sequence_982': ['/control', [16, 114], [127, 9, 8, 2]],
	'/control_sequence_983': ['/control', [16, 114], [127, 9, 8, 3]],
	'/control_sequence_984': ['/control', [16, 114], [127, 9, 8, 4]],
	'/control_sequence_985': ['/control', [16, 114], [127, 9, 8, 5]],
	'/control_sequence_986': ['/control', [16, 114], [127, 9, 8, 6]],
	'/control_sequence_987': ['/control', [16, 114], [127, 9, 8, 7]],
	'/control_sequence_988': ['/control', [16, 114], [127, 9, 8, 8]],
	'/control_sequence_989': ['/control', [16, 114], [127, 9, 8, 9]],
	'/control_sequence_990': ['/control', [16, 114], [127, 9, 9, 0]],
	'/control_sequence_991': ['/control', [16, 114], [127, 9, 9, 1]],
	'/control_sequence_992': ['/control', [16, 114], [127, 9, 9, 2]],
	'/control_sequence_993': ['/control', [16, 114], [127, 9, 9, 3]],
	'/control_sequence_994': ['/control', [16, 114], [127, 9, 9, 4]],
	'/control_sequence_995': ['/control', [16, 114], [127, 9, 9, 5]],
	'/control_sequence_996': ['/control', [16, 114], [127, 9, 9, 6]],
	'/control_sequence_997': ['/control', [16, 114], [127, 9, 9, 7]],
	'/control_sequence_998': ['/control', [16, 114], [127, 9, 9, 8]],
'/control_sequence_999': ['/control', [16, 114], [127, 9, 9, 9]],

    // etc
}


module.exports = {

    init: function () {

        //sendOsc({address: '/bg1', args: [{type: 's', value: 'ff0000'}], host: oscHost, port: oscPort})
        receive('/EDIT', 'bg1', { value: 'ff0000' })

    },

    oscInFilter: function (data) {
        // Filter incomming osc messages
        var { address, args, host, port } = data

        hideShowArticulations(address, args)

        // return data if you want the message to be processed
        return data
    },

    oscOutFilter: function (data) {
        // Filter incomming osc messages
        var { address, args, host, port } = data


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Tap2Tempo
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (address === '/bpm/tap' && args[0].value === 1) {
            // update bpm when the interface sends /bpm/tap 1
            receiveTap(data)

            // bypass original osc message
            return
        }
		
		 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // OSC Midi Sequences
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		if (sequenceRouting[address]) {
            if (args[0].value == 1) controlSequence(host, port, ...sequenceRouting[address])
            return
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Nudge Module
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (address === '/nudge') {

            if (nudgeNoteStart && nudgeNoteEnd) { console.log('Error: NoteStart & NoteEnd pressed'); return; };

            switch (args[0].value) {
                case 'left':
                    if (nudgeNoteStart || nudgeNoteEnd) {
                        if (nudgeNoteStart) {
                            switch (nudgeSelection) {
                                case 0:
                                    sendOsc({ address: '/control', args: [{ type: 'i', value: 8 }, { type: 'i', value: 56 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraCtrlOut' });
                                    break;
                                case 2:
                                    sendOsc({ address: '/control', args: [{ type: 'i', value: 8 }, { type: 'i', value: 52 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraCtrlOut' });
                                    sendOsc({ address: '/control', args: [{ type: 'i', value: 8 }, { type: 'i', value: 60 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraCtrlOut' });
                                    break;
                                case 4:
                                    sendOsc({ address: '/control', args: [{ type: 'i', value: 8 }, { type: 'i', value: 54 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraCtrlOut' });
                                    sendOsc({ address: '/control', args: [{ type: 'i', value: 8 }, { type: 'i', value: 62 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraCtrlOut' });
                                    break;
                            }
                        } else {
                            switch (nudgeSelection) {
                                case 0:
                                    sendOsc({ address: '/control', args: [{ type: 'i', value: 8 }, { type: 'i', value: 58 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraCtrlOut' });
                                    break;
                                case 2:
                                    sendOsc({ address: '/control', args: [{ type: 'i', value: 8 }, { type: 'i', value: 61 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraCtrlOut' });
                                    break;
                                case 4:
                                    sendOsc({ address: '/control', args: [{ type: 'i', value: 8 }, { type: 'i', value: 63 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraCtrlOut' });
                                    break;
                            }
                        }
                    } else {
                        sendOsc({ address: '/control', args: [{ type: 'i', value: 8 }, { type: 'i', value: 50 + nudgeSelection }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraCtrlOut' });
                    }
                    break;
                case 'right':
                    if (nudgeNoteStart || nudgeNoteEnd) {
                        if (nudgeNoteStart) {
                            switch (nudgeSelection) {
                                case 0:
                                    sendOsc({ address: '/control', args: [{ type: 'i', value: 8 }, { type: 'i', value: 57 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraCtrlOut' });
                                    break;
                                case 2:
                                    sendOsc({ address: '/control', args: [{ type: 'i', value: 8 }, { type: 'i', value: 53 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraCtrlOut' });
                                    sendOsc({ address: '/control', args: [{ type: 'i', value: 8 }, { type: 'i', value: 61 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraCtrlOut' });
                                    break;
                                case 4:
                                    sendOsc({ address: '/control', args: [{ type: 'i', value: 8 }, { type: 'i', value: 55 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraCtrlOut' });
                                    sendOsc({ address: '/control', args: [{ type: 'i', value: 8 }, { type: 'i', value: 63 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraCtrlOut' });
                                    break;
                            }
                        } else {
                            switch (nudgeSelection) {
                                case 0:
                                    sendOsc({ address: '/control', args: [{ type: 'i', value: 8 }, { type: 'i', value: 59 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraCtrlOut' });
                                    break;
                                case 2:
                                    sendOsc({ address: '/control', args: [{ type: 'i', value: 8 }, { type: 'i', value: 60 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraCtrlOut' });
                                    break;
                                case 4:
                                    sendOsc({ address: '/control', args: [{ type: 'i', value: 8 }, { type: 'i', value: 62 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraCtrlOut' });
                                    break;
                            }
                        }
                    } else {
                        sendOsc({ address: '/control', args: [{ type: 'i', value: 8 }, { type: 'i', value: 51 + nudgeSelection }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraCtrlOut' });
                    }
                    break;
            }
            return
        }

        if (address === '/nudgeSelection') {
            nudgeSelection = args[0].value;
            new_label = ["Grid", "", "10 Ticks", "", "1 Frame", ""];
            receive('/EDIT', 'modal_nudge', { type: 's', value: { 'label': new_label[args[0].value] } });
            receive('/modal_nudge', 0);
            return;
        }

        if (address === '/nudgeClose') { receive('/modal_nudge', 0); return; }
        if (address === '/nudgeNodeStart') { nudgeNoteStart = args[0].value; console.log('nudgeNoteStart = ' + args[0].value); return; }
        if (address === '/nudgeNodeEnd') { nudgeNoteEnd = args[0].value; console.log('nudgeNoteEnd = ' + args[0].value); return; }
		
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Modal More Close
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		if (address === '/modalmoreClose') { receive('/modal_more_close', 0); return; }
		
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Modal Add New Track
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		if (address === '/modal_add_new_track_close') { receive('/modal_add_new_track', 0); return; }
		if (address == '/control' && args[0].value == 1 && args[1].value >= 2 && args[1].value <= 127) { receive('/modal_add_new_track', 0); return data; };
		
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Modal View Tracks        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		if (address === '/modal_view_tracks_close') { receive('/modal_view_tracks', 0); return; }
		if (address == '/control' && args[0].value == 2 && args[1].value >= [1] && args[1].value <= 127) { receive('/modal_view_tracks', 0); return data; };
		if (address == '/control' && args[0].value == 2 && args[1].value >= [2] && args[1].value <= 127) { receive('/modal_view_tracks', 0); return data; };
		if (address == '/control' && args[0].value == 2 && args[1].value >= [3] && args[1].value <= 127) { receive('/modal_view_tracks', 0); return data; };
		if (address == '/control' && args[0].value == 2 && args[1].value >= [4] && args[1].value <= 127) { receive('/modal_view_tracks', 0); return data; };
		if (address == '/control' && args[0].value == 2 && args[1].value >= [5] && args[1].value <= 127) { receive('/modal_view_tracks', 0); return data; };
		if (address == '/control' && args[0].value == 2 && args[1].value >= [6] && args[1].value <= 127) { receive('/modal_view_tracks', 0); return data; };
		if (address == '/control' && args[0].value == 2 && args[1].value >= [7] && args[1].value <= 127) { receive('/modal_view_tracks', 0); return data; };
		if (address == '/control' && args[0].value == 2 && args[1].value >= [8] && args[1].value <= 127) { receive('/modal_view_tracks', 0); return data; };
		if (address == '/control' && args[0].value == 2 && args[1].value >= [9] && args[1].value <= 127) { receive('/modal_view_tracks', 0); return data; };
		if (address == '/control' && args[0].value == 2 && args[1].value >= [10] && args[1].value <= 127) { receive('/modal_view_tracks', 0); return data; };
		
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Modal Snap Type
		// if (address == '/control' && args[0].value == XCHANNELX && args[1].value <= XADDRESSNUMBERX) { receive('/modal_vel_fixed', 0); return data; };
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		if (address === '/modal_snap_type_close') { receive('/modal_snap_type', 0); return; }
		if (address == '/control' && args[0].value == 3 && args[1].value >= [100] && args[1].value <= 127) { receive('/modal_snap_type', 0); return data; };
		if (address == '/control' && args[0].value == 3 && args[1].value >= [103] && args[1].value <= 127) { receive('/modal_snap_type', 0); return data; };
		if (address == '/control' && args[0].value == 3 && args[1].value >= [104] && args[1].value <= 127) { receive('/modal_snap_type', 0); return data; };
		if (address == '/control' && args[0].value == 3 && args[1].value >= [106] && args[1].value <= 127) { receive('/modal_snap_type', 0); return data; };
		
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Transpose Module
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (address === '/transpose') {

            switch (args[0].value) {
                case 'up':
                    if (transposeCopy) {
                        sendOsc({ address: '/control', args: [{ type: 'i', value: 8 }, { type: 'i', value: 24 + transposeInterval }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraCtrlOut' });
                    } else {
                        sendOsc({ address: '/control', args: [{ type: 'i', value: 8 }, { type: 'i', value: 0 + transposeInterval }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraCtrlOut' });
                    }
                    break;

                case 'down':
                    if (transposeCopy) {
                        sendOsc({ address: '/control', args: [{ type: 'i', value: 8 }, { type: 'i', value: 36 + transposeInterval }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraCtrlOut' });
                    } else {
                        sendOsc({ address: '/control', args: [{ type: 'i', value: 8 }, { type: 'i', value: 12 + transposeInterval }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraCtrlOut' });
                    }
                    break;

            }
            return
        }

        if (address === '/transposeInterval') {
            transposeInterval = args[0].value;
            new_label = ["m2", "M2", "m3", "M3", "P4", "TT", "P5", "m6", "M6", "m7", "M7", "P8"];
            receive('/EDIT', 'modal_transpose_interval', { type: 's', value: { 'label': new_label[args[0].value] } });
            receive('/modal_transpose_interval', 0);
            return;
        }

        if (address === '/transposeClose') { 
            receive('/modal_transpose_interval', 0); 
            return; 
        }

        if (address === '/transposeCopy') { transposeCopy = args[0].value; console.log('Transpose Copy = ' + args[0].value); return; }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // General Trackview Controls                               
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // View all Tracks
        if (address == '/push_view_all') {
            sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 50 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' });

            // Pianos 
            sendOsc({ address: '/toggle_vis_P', args: [{ type: 'i', value: 1 }], host: oscHost, port: oscPort });

            // Synchron Strings 
            sendOsc({ address: '/toggle_vis_SS', args: [{ type: 'i', value: 1 }], host: oscHost, port: oscPort });

            // Superior Drummer
            sendOsc({ address: '/toggle_vis_SD', args: [{ type: 'i', value: 1 }], host: oscHost, port: oscPort });

            // Dimension Brass
            sendOsc({ address: '/switch_DB', args: [{ type: 'i', value: 14 }], host: oscHost, port: oscPort });

            // Dimension Strings
            sendOsc({ address: '/switch_DS', args: [{ type: 'i', value: 24 }], host: oscHost, port: oscPort });

            // Appassionata Strings
            sendOsc({ address: '/toggle_vis_AS', args: [{ type: 'i', value: 1 }], host: oscHost, port: oscPort });

            // Legacy Brass
            sendOsc({ address: '/toggle_vis_LB', args: [{ type: 'i', value: 1 }], host: oscHost, port: oscPort });

            // Legacy Winds
            sendOsc({ address: '/toggle_vis_LW', args: [{ type: 'i', value: 1 }], host: oscHost, port: oscPort });

            // EW Silk
            sendOsc({ address: '/toggle_vis_ES', args: [{ type: 'i', value: 1 }], host: oscHost, port: oscPort });

            // Hollywood Choirs
            sendOsc({ address: '/toggle_vis_HC', args: [{ type: 'i', value: 1 }], host: oscHost, port: oscPort });

            // Voices of Soul
            sendOsc({ address: '/toggle_vis_VoS', args: [{ type: 'i', value: 1 }], host: oscHost, port: oscPort });

            // Individual Play
            sendOsc({ address: '/toggle_vis_IP', args: [{ type: 'i', value: 1 }], host: oscHost, port: oscPort });

            // Individual Omnisphere
            sendOsc({ address: '/toggle_vis_IO', args: [{ type: 'i', value: 1 }], host: oscHost, port: oscPort });

            // Individual Kontakts
            sendOsc({ address: '/toggle_vis_IK', args: [{ type: 'i', value: 1 }], host: oscHost, port: oscPort });

            return
        }

        // Hide all Tracks
        if (address == '/push_view_none') {
            sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 49 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' });

            // Pianos 
            sendOsc({ address: '/toggle_vis_P', args: [{ type: 'i', value: 2 }], host: oscHost, port: oscPort });

            // Synchron Strings 
            sendOsc({ address: '/toggle_vis_SS', args: [{ type: 'i', value: 2 }], host: oscHost, port: oscPort });

            // Superior Drummer
            sendOsc({ address: '/toggle_vis_SD', args: [{ type: 'i', value: 2 }], host: oscHost, port: oscPort });

            // Dimension Brass
            sendOsc({ address: '/switch_DB', args: [{ type: 'i', value: 10 }], host: oscHost, port: oscPort });

            // Dimension Strings
            sendOsc({ address: '/switch_DS', args: [{ type: 'i', value: 20 }], host: oscHost, port: oscPort });

            // Appassionata Strings
            sendOsc({ address: '/toggle_vis_AS', args: [{ type: 'i', value: 2 }], host: oscHost, port: oscPort });

            // Legacy Brass
            sendOsc({ address: '/toggle_vis_LB', args: [{ type: 'i', value: 2 }], host: oscHost, port: oscPort });

            // Legacy Winds
            sendOsc({ address: '/toggle_vis_LW', args: [{ type: 'i', value: 2 }], host: oscHost, port: oscPort });

            // EW Silk
            sendOsc({ address: '/toggle_vis_ES', args: [{ type: 'i', value: 2 }], host: oscHost, port: oscPort });

            // Hollywood Choirs
            sendOsc({ address: '/toggle_vis_HC', args: [{ type: 'i', value: 2 }], host: oscHost, port: oscPort });

            // Voices of Soul
            sendOsc({ address: '/toggle_vis_VoS', args: [{ type: 'i', value: 2 }], host: oscHost, port: oscPort });

            // Individual Play
            sendOsc({ address: '/toggle_vis_IP', args: [{ type: 'i', value: 2 }], host: oscHost, port: oscPort });

            // Individual Omnisphere
            sendOsc({ address: '/toggle_vis_IO', args: [{ type: 'i', value: 2 }], host: oscHost, port: oscPort });

            // Individual Kontakts
            sendOsc({ address: '/toggle_vis_IK', args: [{ type: 'i', value: 2 }], host: oscHost, port: oscPort });

            return
        }

        // View defaults
        if (address == '/push_view_defaults') {

            // Hide all Tracks
            sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 49 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })

            // Pianos 
            sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 31 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            sendOsc({ address: '/toggle_vis_P', args: [{ type: 'i', value: 1 }], host: oscHost, port: oscPort })

            // Synchron Strings 
            sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 1 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            sendOsc({ address: '/toggle_vis_SS', args: [{ type: 'i', value: 1 }], host: oscHost, port: oscPort })

            // Superior Drummer
            sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 65 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            sendOsc({ address: '/toggle_vis_SD', args: [{ type: 'i', value: 1 }], host: oscHost, port: oscPort })

            // Dimension Brass
            sendOsc({ address: '/switch_DB', args: [{ type: 'i', value: 10 }], host: oscHost, port: oscPort })

            // Dimension Strings
            sendOsc({ address: '/switch_DS', args: [{ type: 'i', value: 20 }], host: oscHost, port: oscPort })

            // Appassionata Strings
            sendOsc({ address: '/toggle_vis_AS', args: [{ type: 'i', value: 2 }], host: oscHost, port: oscPort });

            // Legacy Brass
            sendOsc({ address: '/toggle_vis_LB', args: [{ type: 'i', value: 2 }], host: oscHost, port: oscPort });

            // Legacy Winds
            sendOsc({ address: '/toggle_vis_LW', args: [{ type: 'i', value: 2 }], host: oscHost, port: oscPort });

            // EW Silk
            sendOsc({ address: '/toggle_vis_ES', args: [{ type: 'i', value: 2 }], host: oscHost, port: oscPort });

            // Hollywood Choirs
            sendOsc({ address: '/toggle_vis_HC', args: [{ type: 'i', value: 2 }], host: oscHost, port: oscPort });

            // Voices of Soul
            sendOsc({ address: '/toggle_vis_VoS', args: [{ type: 'i', value: 2 }], host: oscHost, port: oscPort });

            // Individual Play
            sendOsc({ address: '/toggle_vis_IP', args: [{ type: 'i', value: 2 }], host: oscHost, port: oscPort });

            // Individual Omnisphere
            sendOsc({ address: '/toggle_vis_IO', args: [{ type: 'i', value: 2 }], host: oscHost, port: oscPort });

            // Individual Kontakts
            sendOsc({ address: '/toggle_vis_IK', args: [{ type: 'i', value: 2 }], host: oscHost, port: oscPort });

            return
        }

        // Show Tracks with Data
        if (address == '/push_view_data') { sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 51 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' }); return; }
        if (address == '/push_view_data_cursor') { sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 52 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' }); return; }
        if (address == '/push_view_data_region') { sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 53 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' }); return; }



        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Individual Track Controls                               
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // Dimension Brass
        if (address == '/switch_DB') {
            if (args[0].value > 10 && args[0].value < 14) { sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 10 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' }) }
            sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: args[0].value }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            return
        }

        // Dimension Strings
        if (address == '/switch_DS') {
            if (args[0].value > 20 && args[0].value < 24) { sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 20 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' }) }
            sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: args[0].value }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            return
        }

        // Synchron Strings
        if (address == '/toggle_vis_SS') {
            if (args[0].value == 1) {
                sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 1 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            } else {
                sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 2 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            }
            return
        }

        // App. Strings
        if (address == '/toggle_vis_AS') {
            if (args[0].value == 1) {
                sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 3 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            } else {
                sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 4 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            }
            return
        }

        // Legacy Brass
        if (address == '/toggle_vis_LB') {
            if (args[0].value == 1) {
                sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 5 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            } else {
                sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 6 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            }
            return
        }

        // Legacy Winds
        if (address == '/toggle_vis_LW') {
            if (args[0].value == 1) {
                sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 7 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            } else {
                sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 8 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            }
            return
        }

        // Pianos
        if (address == '/toggle_vis_P') {
            if (args[0].value == 1) {
                sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 31 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            } else {
                sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 32 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            }
            return
        }

        // EastWest Silk
        if (address == '/toggle_vis_ES') {
            if (args[0].value == 1) {
                sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 41 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            } else {
                sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 42 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            }
            return
        }

        //  EastWest Voices of Soul
        if (address == '/toggle_vis_VoS') {
            if (args[0].value == 1) {
                sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 43 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            } else {
                sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 44 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            }
            return
        }

        //  Individual Play
        if (address == '/toggle_vis_IP') {
            if (args[0].value == 1) {
                sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 45 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            } else {
                sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 46 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            }
            return
        }

        //  Individual Kontakts
        if (address == '/toggle_vis_IK') {
            if (args[0].value == 1) {
                sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 47 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            } else {
                sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 48 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            }
            return
        }

        //  Individual Omnisphere
        if (address == '/toggle_vis_IO') {
            if (args[0].value == 1) {
                sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 63 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            } else {
                sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 64 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            }
            return
        }

        //  Hollywood Choir
        if (address == '/toggle_vis_HC') {
            if (args[0].value == 1) {
                sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 61 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            } else {
                sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 62 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            }
            return
        }


        // Superior Drummer
        if (address == '/toggle_vis_SD') {
            if (args[0].value == 1) {
                sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 65 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            } else {
                sendOsc({ address: '/note', args: [{ type: 'i', value: 1 }, { type: 'i', value: 66 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraVisOut' })
            }
            return
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Modal View Velocity Control 
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (address == '/control' && args[0].value == 5 && args[1].value <= 12) { receive('/modal_vel_fixed', 0); return data; };

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Lanes Module
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (address == '/control' && args[0].value == 3 && args[1].value >= 30 && args[1].value <= 37) { receive('/modal_lanes', 0); return data; };
        if (address == '/control' && args[0].value == 4 && args[1].value >= 100 && args[1].value <= 108) { receive('/modal_lanes_copy', 0); return data; };
		
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Control Room Volume Module
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (address == '/control' && args[0].value == 9 && args[1].value >= 1 && args[1].value <= 127) { receive('/modal_controlroom_volume', 0); return data; };
        /*if (address == '/control' && args[0].value == 4 && args[1].value >= 100 && args[1].value <= 108) { receive('/modal_lanes_copy', 0); return data; };*/

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Selector Module
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (address == '/selector_area') { selectorArea = args[0].value; };
        if (address == '/selector_type') { selectorType = args[0].value; };
        if (address == '/selector_subtype') { selectorSubType = args[0].value; };
        if (address == '/switch_rhythm') { selectorRhythm = args[0].value; };

        // View all Tracks
        if (address == '/selector_select') {

            console.log('----')
            console.log('selectorArea: ' + selectorArea)
            console.log('selectorType: ' + selectorType)
            console.log('selectorSubType: ' + selectorSubType)
            console.log('selectorRhythm: ' + selectorRhythm)
            console.log('----')



            switch (selectorType) {
                case 1: // Note
                    switch (selectorArea) {
                        // Selection 
                        case 1: sendOsc({ address: '/control', args: [{ type: 'i', value: 6 }, { type: 'i', value: 1 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraCtrlOut' }); break;
                        // Region
                        case 2: sendOsc({ address: '/control', args: [{ type: 'i', value: 6 }, { type: 'i', value: 8 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraCtrlOut' }); break;
                    }
                    switch (selectorSubType) {
                        // All 
                        case 1: break;
                        // Rhythm
                        case 2:
                            // Send selectorRhythm
                            sendOsc({ address: '/control', args: [{ type: 'i', value: 7 }, { type: 'i', value: selectorRhythm }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraCtrlOut' });
                            // Zoom out - Zoom in
                            sendOsc({ address: '/control', args: [{ type: 'i', value: 6 }, { type: 'i', value: 127 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraCtrlOut' });
                            sendOsc({ address: '/control', args: [{ type: 'i', value: 6 }, { type: 'i', value: 126 }, { type: 'i', value: 127 }], host: 'midi', port: 'oscTraCtrlOut' });
                            break;
                    }
                    break;
            }
            return
        }
        return data
    }
}
