class generator {
    
    async randomString(length: Number) {
        var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
        var string = '';
        for(var i=0; i<length; i++){
            string += chars[Math.floor(Math.random() * chars.length)];
        }
        return string
    }
  
    async waitForTime(waitTimeInSeconds){
      console.log('Waiting for '+waitTimeInSeconds);
      var waitTimeInMilliseconds = waitTimeInSeconds * 1000;
      await browser.pause(waitTimeInMilliseconds)
    }
  
}
  
export default new generator();