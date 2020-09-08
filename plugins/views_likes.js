/*
    krpano HTML5 Javascript Plugin Example
*/

function krpanoplugin()
{
    function ajax(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
          if(this.status === 404){
            callback("no found");
          }
          else{
            callback(this.responseText);
          }

        }
      });
      xhr.open("POST", url);
      xhr.send();
    }

    var local = this;   // save the 'this' pointer from the current plugin object
    var krpano = null;  // the krpano and plugin interface objects
    var plugin = null;

    var VIEWS_COUNT_URL = 'http://hello.artexb.com/wp-json/simple_views_counter/set?id=';
    var LIKES_COUNT_URL = 'http://hello.artexb.com/wp-json/simple_likes_button/get?id=';
    var LIKES_COUNT_POST_URL = 'http://hello.artexb.com/wp-json/simple_likes_button/set?id=';

    local.registerplugin = function(krpanointerface, pluginpath, pluginobject)
    {
        // get the krpano interface and the plugin object
        krpano = krpanointerface;
        plugin = pluginobject;

        // first - say hello
        krpano.trace(1, "hello from plugin[" + plugin.name + "]");

        // add plugin attributes
        plugin.registerattribute("post_id",'');
        plugin.registerattribute("views_count",'0');
        plugin.registerattribute("likes_count",'0');
        plugin.registerattribute("already_like",'0');

        // add plugin action (the attribute needs to be lowercase!)
        // plugin.dosomething = action_doingsomthing;
        plugin.update_views = action_update_views;
        plugin.click_likes = click_likes;
    }

    // unloadplugin - exit point for the plugin (optionally)
    // - will be called from krpano when the plugin will be removed
    // - everything that was added by the plugin should be removed here
    local.unloadplugin = function()
    {
        plugin = null;
        krpano = null;
    }

    // onresize (optionally)
    // - width,height = the new size for the plugin
    // - when not defined then only the krpano plugin html element will be sized
    local.onresize = function(width,height)
    {
        // not used in this example
        // the plugin content will resize automatically because
        // of the width=100%, height=100% CSS style
        return false;
    }

    function action_update_views(){
      ajax(VIEWS_COUNT_URL+plugin.post_id, function(res) {
        krpano.trace(1,res);
        plugin.views_count = res;
        krpano.call( "update_views_likes()" );
      });
      ajax(LIKES_COUNT_URL+plugin.post_id, function(res) {
        krpano.trace(1,res);
        krpano.trace('hi');
        if(res === 'no found'){
          plugin.likes_count = 'no found';
        }
        else{
          var data = JSON.parse(res);
          plugin.likes_count = String(data.likes);
          plugin.already_like = String(data.already_like);
        }
        krpano.call( "update_views_likes()" );
      });
    }

    function click_likes() {
      if(plugin.already_like == 'false'){
        ajax(LIKES_COUNT_POST_URL+plugin.post_id, function(res) {
          krpano.trace(1,res);
          plugin.likes_count = res;
          plugin.already_like = 'true'
          krpano.call( "update_views_likes()" );
        });
      }

    }
}
