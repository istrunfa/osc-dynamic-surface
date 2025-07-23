var routing = {
  // midi cc vs widget id
  36: 'kick',
  38: 'snare',
  46: 'hihat',
  48: 'tom_left',
  45: 'tom_right',
  43: 'pauke',
  49: 'cymb_left',
  51: 'cymb_right',
  // etc
}

var sentBounce = false;
//if width/height changes, the way is longer, so it has similar impact as speed values have
var width = 800;
var height = 800;

// start value for the imaginary bouncer
var x = 80;
var y = 80;
//speed for bouncer
var vx = 20;
var vy = 25;
//update interval in milli seconds, also has impaaact on speed, but more on smoothness
updateInterval = 100;


module.exports = {
  oscInFilter: function (data) {
    // Filter incoming osc messages
    var { address, args, host, port } = data

    if (host === 'midi') {
      // MIDI routing !
      if (address === '/note') {
        // assign args to variables
        var [channel, ctrl, value] = args.map(arg => arg.value)
        // note: /SET simulates a user interaction and makes the widget send its osc message
        // but it adds some delay (we wait for the UI to respond)
        // AND it may trigger multiple replies if more than one client are connected.
        // simple conditions

        //if (ctrl === 48) receive('/SET', 'widget_id', value / 127)
        // if (ctrl === 45) {
        //   //console.log(value);
        //   receive('/SET', 'tom_left', value / 127)
        // }

        // simple routing table (midi cc vs widget id)
        // if (routing[ctrl]){
        //   receive('/SET', routing[ctrl], value / 127);
        // }

        switch (ctrl) {
          case 36:
            // receive('/SET', 'kick', value / 127)
            receive('/SET', 'vimix/drums0', value / 127)
            break;
          case 38:
            // receive('/SET', 'snare', value / 127)
            receive('/SET', 'vimix/drums1', value / 127)
            break;
          case 42:
            // receive('/SET', 'hihatclose', value / 127)
            receive('/SET', 'vimix/drums2', value / 127)
            break;
          case 46:
            // receive('/SET', 'hihatopen', value / 127)
            receive('/SET', 'vimix/drums3', value / 127)
            break;
          case 48:
            // receive('/SET', 'tom_left', value / 127)
            receive('/SET', 'vimix/drums4', value / 127)
            break;
          case 45:
            // receive('/SET', 'tom_right', value / 127)
            receive('/SET', 'vimix/drums5', value / 127)
            break;
          case 43:
            // receive('/SET', 'pauke', value / 127)
            receive('/SET', 'vimix/drums6', value / 127)
            break;
          case 49:
            // receive('/SET', 'cymb_left', value / 127)
            receive('/SET', 'vimix/drums7', value / 127)
            break;
          case 51:
            // receive('/SET', 'cymb_right', value / 127)
            receive('/SET', 'vimix/drums8', value / 127)
            break;
          case 40:
            // receive('/SET', 'snare_rim', value / 127)
            receive('/SET', 'vimix/drums9', value / 127)
            break;

        }
        // Alternatively, we could do this:
        //send('/osc_address', value / 127)
        //receive('/osc_address', value / 127)
        // Or, to send /SET to a single client:
        // receive('/SET', '/osc_address', value / 127, {clientId: ID})
      }
      return // bypass original message
    }

    // return data if you want the message to be processed
    return { address, args, host, port }
  },

  //

  oscOutFilter: function (data) {
    // Filter outgoing osc messages
    var { address, args, host, port, clientId } = data

    //change the tabs when loading a new vimix.mix
    if (address === '/vimix/session/open') {

      var [value] = args.map(arg => arg.value)

      switch (value) {
        case '/home/thomsen/aaa_WRX_/VISUALS/000I0_Mapping/VIMIX_sessions/00.mix':
          receive('/TABS', '00_mix')
          break;

        case '/home/thomsen/aaa_WRX_/VISUALS/000I0_Mapping/VIMIX_sessions/01.mix':
          receive('/TABS', '01_mix')
          break;

        case '/home/thomsen/aaa_WRX_/VISUALS/000I0_Mapping/VIMIX_sessions/02.mix':
          receive('/TABS', '02_mix')
          break;

        case '/home/thomsen/aaa_WRX_/VISUALS/000I0_Mapping/VIMIX_sessions/03.mix':
          receive('/TABS', '03_mix')
          break;

        case '/home/thomsen/aaa_WRX_/VISUALS/000I0_Mapping/VIMIX_sessions/04.mix':
          receive('/TABS', '04_mix')
          break;

        case '/home/thomsen/aaa_WRX_/VISUALS/000I0_Mapping/VIMIX_sessions/05.mix':
          receive('/TABS', '05_mix')
          break;

        case '/home/thomsen/aaa_WRX_/VISUALS/000I0_Mapping/VIMIX_sessions/06.mix':
          receive('/TABS', '06_mix')
          break;

        case '/home/thomsen/aaa_WRX_/VISUALS/000I0_Mapping/VIMIX_sessions/07.mix':
          receive('/TABS', '07_mix')
          break;

        case '/home/thomsen/aaa_WRX_/VISUALS/000I0_Mapping/VIMIX_sessions/08.mix':
          receive('/TABS', '08_mix')
          break;

      }

    }

    //START VALUE BUTTONS
    
    var deactValue = 0.35;
    var numOfBatches = 16;

    if (address === '/STARTVALS_00') {
      for (var i = 0; i < numOfBatches; i++) {
        var setTarget = '/vimix/selection#' + i + '/alpha'
        // console.log(setTarget)
        // send(setTarget, 0);
         receive('/SET', setTarget, -deactValue)
      }
      receive('/SET','/vimix/selection#9/alpha', 0)
      receive('/SET','/vimix/selection#1/alpha', 1)
    }

    if (address === '/STARTVALS_01') {
      for (var i = 0; i < numOfBatches; i++) {
        var setTarget = '/vimix/selection#' + i + '/alpha'
        // send(setTarget, deactValue);
        receive('/SET', setTarget, -deactValue)
      }
      receive('/SET','/vimix/selection#9/alpha', 0)
      receive('/SET', '/vimix/selection#1/alpha', 1)
    }

    if (address === '/STARTVALS_02') {
      for (var i = 0; i < numOfBatches; i++) {
        var setTarget = '/vimix/selection#' + i + '/alpha'
        // send(setTarget, deactValue);
        receive('/SET', setTarget, -deactValue)
      }
      receive('/SET','/vimix/selection#9/alpha', 0)
      receive('/SET', '/vimix/selection#1/alpha', 1)
    }

    if (address === '/STARTVALS_03') {
      for (var i = 0; i < numOfBatches; i++) {
        var setTarget = '/vimix/selection#' + i + '/alpha'
        // send(setTarget, deactValue);
        receive('/SET', setTarget, -deactValue)
      }
      receive('/SET','/vimix/selection#9/alpha', 0)
      receive('/SET', '/vimix/selection#1/alpha', 1)
    }

    if (address === '/STARTVALS_04') {
      for (var i = 0; i < numOfBatches; i++) {
        var setTarget = '/vimix/selection#' + i + '/alpha'
        // send(setTarget, deactValue);
        receive('/SET', setTarget, -deactValue)
      }
      receive('/SET','/vimix/selection#9/alpha', 0)
      receive('/SET', '/vimix/selection#0/alpha', 1)
      receive('/SET', '/vimix/selection#1/alpha', 1)
    }

    if (address === '/STARTVALS_05') {
      for (var i = 0; i < numOfBatches; i++) {
        var setTarget = '/vimix/selection#' + i + '/alpha'
        // send(setTarget, deactValue);
        receive('/SET', setTarget, -deactValue)
      }
      receive('/SET','/vimix/selection#9/alpha', 0)
      receive('/SET', '/vimix/selection#12/alpha', 1)
    }

    if (address === '/STARTVALS_06') {
      for (var i = 0; i < numOfBatches; i++) {
        var setTarget = '/vimix/selection#' + i + '/alpha'
        // send(setTarget, deactValue);
        receive('/SET', setTarget, -deactValue)
      }
      receive('/SET','/vimix/selection#9/alpha', 0)
      receive('/SET', '/vimix/selection#1/alpha', 1)
    }

    if (address === '/STARTVALS_07') {
      for (var i = 0; i < numOfBatches; i++) {
        var setTarget = '/vimix/selection#' + i + '/alpha'
        // send(setTarget, deactValue);
        receive('/SET', setTarget, -deactValue)
      }
      receive('/SET','/vimix/selection#9/alpha', 0)
      receive('/SET', '/vimix/selection#1/alpha', 1)
    }

    if (address === '/STARTVALS_08') {
      for (var i = 0; i < numOfBatches; i++) {
        var setTarget = '/vimix/selection#' + i + '/alpha'
        // send(setTarget, deactValue);
        receive('/SET', setTarget, -deactValue)
      }
      receive('/SET','/vimix/selection#9/alpha', 0)
      receive('/SET', '/vimix/selection#1/alpha', 1)
      receive('/SET', '/vimix/selection#2/alpha', .75)
    }





    // bouncing x/y coordinates
    if (address === '/bouncer') {
      if (sentBounce == true) { sentBounce = false } else { sentBounce = true }
      console.log(sentBounce);
    }

    // if(address === '/setInterval') {
    //   var [value] = args.map(arg=>arg.value)
    //   updateInterval = value * 1000;
    // }

    if (sentBounce) {

      setInterval(function () {
        // bouncing ball from here
        //https://www.geeksforgeeks.org/how-to-build-a-bounce-ball-with-html-and-javascript/

        if (x > width)
          vx = 0 - vx;

        if (x < 0)
          vx = 0 - vx;

        if (y > height)
          vy = 0 - vy;

        if (y < 0)
          vy = 0 - vy;

        x = x + vx;
        y = y + vy;
        y = y + vy;
        receive('/receiveBounceX', x / width);
        receive('/receiveBounceY', y / height);
        // console.log(x);
        // console.log(y);
      }, updateInterval) // every 10 m

    }

    return { address, args, host, port }

  },

}
