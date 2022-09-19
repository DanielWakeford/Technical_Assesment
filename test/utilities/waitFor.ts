class waitFor {
    
  async waitForAnimatedElement(animatedElement){
      await animatedElement.waitForExist(15000);
      var animating = true;
      var preLoc = await animatedElement.getLocation();
        while(animating){
          await browser.pause(150);
          var postLoc = await animatedElement.getLocation();
            if(preLoc.x == postLoc.x && preLoc.y == postLoc.y) {
              animating = false;
            } 
          var spread = [postLoc.x - preLoc.x, postLoc.y - preLoc.y]
          preLoc = postLoc;
        }
    return true;    
  }

  async waitForTime(waitTimeInSeconds){
    console.log('Waiting for '+waitTimeInSeconds);
    var waitTimeInMilliseconds = waitTimeInSeconds * 1000;
    await browser.pause(waitTimeInMilliseconds)
  }

  async waitForUrlInclude(expectedUrl) {
    await browser.waitUntil(
      async () => await (await browser.getUrl()).includes(expectedUrl), {timeoutMsg: `Timeout waiting for url to include ${expectedUrl}`}
    );
  }

  async waitForUrlNotInclude(expectedUrl) {
    await browser.waitUntil(
      async () => await (await browser.getUrl()).includes(expectedUrl), {timeoutMsg: `Timeout waiting for url not to include ${expectedUrl}`}
    );
  }
  
}
  
export default new waitFor();