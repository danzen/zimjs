function HttpClient() { }
HttpClient.prototype = {
    // type GET,POST passed to open
    requestType:'POST',
    // when set to true, async calls are made
    isAsync:false,
    // where an XMLHttpRequest instance is stored
    xmlhttp:false,
    // what is called when a successful async call is made
    callback:false,
    // what is called when send is called on XMLHttpRequest
    // set your own function to onSend to have a custom loading effect

    onSend:function() {
        //document.getElementById('HttpClientStatus').style.display ='block';
    },

    // what is called when readyState 4 is reached, this is
    // called before your callback
    onload:function() {
         //document.getElementById('HttpClientStatus').style.display = 'none';
    },

    // what is called when an http error happens
    onError:function(error) {
         alert(error);
    },

    // method to initialize an xmlhttpclient
    init:function() {
        try {
            // Mozilla / Safari
             this.xmlhttp = new XMLHttpRequest();
        } catch (e) {
            // IE
            var XMLHTTP_IDS = new Array('MSXML2.XMLHTTP.5.0','MSXML2.XMLHTTP.4.0','MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP','Microsoft.XMLHTTP');
            var success = false;
            for (var i=0;i < XMLHTTP_IDS.length && !success; i++) {
                try {
                    this.xmlhttp = new ActiveXObject(XMLHTTP_IDS[i]);
                    success = true;
                } catch (e) {}
            }
            if (!success) {
                this.onError('Unable to create XMLHttpRequest.');
            }
        }
    },

    // method to make a page request
    // @param string url  The page to make the request to
    // @param string payload  What you're sending if this is a POST request

    makeRequest: function(url,payload) {
        if (!this.xmlhttp) {
            this.init();
        }
        this.xmlhttp.open(this.requestType,url,this.isAsync);
		this.xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8;');
		// set onreadystatechange here since it will be reset after a
		//completed call in Mozilla
		if (this.isAsync) {
			var self = this;
			this.xmlhttp.onreadystatechange = function() {
				self._readyStateChangeCallback();
			}
		}
        this.xmlhttp.send(payload);
        if (!this.isAsync) {
            return this.xmlhttp.responseText;
        }
    },

    // internal method used to handle ready state changes
   _readyStateChangeCallback:function() {
        switch(this.xmlhttp.readyState) {
            case 2:
              this.onSend();
              break;
           case 4:
              this.onload();
              if (this.xmlhttp.status == 200) {
                  this.callback(this.xmlhttp.responseText);
              } else {
                  this.onError('HTTP Error Making Request: '+ '['+this.xmlhttp.status+']'+ this.xmlhttp.statusText);
              }
           break;
        }
    }
}
